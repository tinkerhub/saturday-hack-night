import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import fetch from "node-fetch";

const app = admin.initializeApp();
const firestore = app.firestore();

export const onNewUser = functions.auth.user().onCreate((user) =>
{
	const data = {
		name: user.displayName,
		uid: user.uid,
		email: user.email,
		avatar: user.photoURL,
	};

	return firestore.collection("users").doc(user.uid).set(data, {merge: true});
});

export const onTeamCreated = functions.firestore.document("/events/{eventID}/teams/{teamID}")
	.onCreate(async (snapshot, context) =>
	{
		const bulk = firestore.bulkWriter();
		const membersRef = snapshot.ref.collection("members");

		bulk.create(firestore.doc(`users/${snapshot.get("lead")}/teams/${context.params.eventID}`), {
			teamID: context.params.teamID,
			eventID: context.params.eventID,
			name: snapshot.get("name"),
			repo: snapshot.get("repo"),
			lead: true,
		});

		if (snapshot.get("members"))
			for (const uid of snapshot.get("members"))
				bulk.create(membersRef.doc(uid),
					{
						uid,
						inviteSent: false,
						accepted: false,
					});

		const token = functions.config().github.token;

		const event = await firestore.doc(`events/${context.params.eventID}`).get();
		const repo = `${event.get("org")}/${event.get("repoName")}`;

		const response =
		await fetch(`https://api.github.com/repos/${repo}/actions/workflows/add-project.yml/dispatches`,
			{
				headers:
				{
					"Accept": "application/vnd.github.v3+json",
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(
					{
						ref: "main",
						inputs: {
							"repo_url": snapshot.get("repo"),
							"folder_name": `${snapshot.get("name")} | ${context.params.teamID}`,
						},
					}),
			})
			.then((res) => res.text());

		if (response)
			console.error(response);

		return bulk.flush();
	});


export const joinTeam = functions.https.onCall(async (data, context)=>
{
	if (!context.auth?.uid)
		throw new functions.https.HttpsError("unauthenticated", "User not authenticated");

	if (!data.teamID)
		throw new functions.https.HttpsError("invalid-argument", "teamID is required.");

	if (!data.eventID)
		throw new functions.https.HttpsError("invalid-argument", "eventID is required.");

	const registration = await firestore.doc(`users/${context.auth.uid}/teams/${data.eventID}`).get();

	if (registration.exists)
		throw new functions.https.HttpsError("already-exists", "User already in a team for this event");

	const batch = firestore.batch();

	const member = firestore.doc(`events/${data.eventID}/${data.teamID}/members/${context.auth?.uid}`);
	const team = firestore.doc(`users/${context.auth?.uid}/teams/${data.teamID}`);

	batch.update(member, {accepted: true})
		.create(team, {});

	await batch.commit().catch((error) =>
	{
		if (error.code === "not-found")
			throw new functions.https.HttpsError("permission-denied", "User not invited");
		if (error.code === "already-exists")
			throw new functions.https.HttpsError("aborted", "User already joined this team");

		console.error(error);

		throw new functions.https.HttpsError("unknown", "Something went wrong.");
	});

	return {success: true};
});
