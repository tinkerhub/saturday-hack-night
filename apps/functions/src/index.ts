import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
const app = admin.initializeApp();
const firestore = app.firestore();


async function queueMails(
  bulk: FirebaseFirestore.WriteBatch,
  eventID: string,
  teamID: string,
  lead: string,
  members: Array<string>,
  teamName: string,
  repo: string,
  isUpdate: boolean,
) {
  const mails = firestore.collection(
    `/events/${eventID}/teams/${teamID}/mails`,
  );
  const leadUserDoc = firestore.doc(`users/${lead}`);
  const leadUser = await leadUserDoc.get();

  const emailPromises = [];

  if (!isUpdate) {
    emailPromises.push(
      bulk.create(mails.doc(lead), {
        to: [leadUser.get("email")],
        template: {
          name: "create",
          data: {
            name: leadUser.get("name"),
            teamName,
            repo,
            eventID,
            teamID,
          },
        },
      })
    );
  }

  for (const member of members || []) {
    const userDoc = firestore.doc(`users/${member}`);
    emailPromises.push(userDoc.get().then((user) => {
      return bulk.create(mails.doc(member), {
        to: [user.get("email")],
        template: {
          name: "invite",
          data: {
            lead: leadUser.get("name"),
            name: user.get("name"),
            teamName,
            eventID,
            teamID,
          },
        },
      });
    }));
  }

  await Promise.allSettled(emailPromises);
}


export const onNewUser = functions.auth.user().onCreate(async (user) => {
  const parts = user.photoURL?.split("/") as unknown as string;
  const idNo = parts[parts.length - 1].split("?")[0];

  const github: any = await fetch(`https://api.github.com/user/${idNo}`).then(
    (response) => response.json(),
  );
  const data = {
    name: user.displayName,
    uid: user.uid,
    email: user.email,
    avatar: user.photoURL || null,
    githubID: github.login || null,
    repos: github.repos_url || null,
  };

  return firestore.collection("users").doc(user.uid).set(data, { merge: true });
});

export const onTeamCreated = functions.firestore
  .document("/events/{eventID}/teams/{teamID}")
  .onCreate(async (snapshot, context) => {
    const bulk = firestore.batch();
    const membersRef = snapshot.ref.collection("members");
    bulk.create(
      firestore.doc(
        `users/${snapshot.get("lead")}/teams/${context.params.eventID}`,
      ),
      {
        teamID: context.params.teamID,
        eventID: context.params.eventID,
        name: snapshot.get("name"),
        repo: snapshot.get("repo"),
        lead: true,
      },
    );
    if (snapshot.get("members"))
      for (const uid of snapshot.get("members"))
        bulk.create(membersRef.doc(uid), {
          uid,
          accepted: false,
        });

    await queueMails(
      bulk,
      context.params.eventID,
      context.params.teamID,
      snapshot.get("lead"),
      snapshot.get("members"),
      snapshot.get("name"),
      snapshot.get("repo"),
      false,
    );

    return bulk
      .commit()
      .catch((err) =>
        console.error(err, `Team ID => ${context.params.teamID}`),
      );
  });

export const onTeamEdited = functions.firestore
  .document("/events/{eventID}/teams/{teamID}")
  .onUpdate(async (change, context) => {
    const bulk = firestore.batch();
    const membersRef = change.after.ref.collection("members");

    const newMembers = change.after.get("members");
    const oldMember = change.before.get("members");

    const added = newMembers.filter((x: string) => !oldMember.includes(x));
    const removed = oldMember.filter((x: string) => !newMembers.includes(x));

    const oldStatus = change.before.get("status");
    const newStatus = change.after.get("status");

    if (
      (!oldStatus || oldStatus === "DROPPED" || oldStatus === "PENDING") &&
      (newStatus === "BEST PROJECT" || newStatus === "COMPLETE")
    ) {
      bulk.update(firestore.doc(`/events/${context.params.eventID}`), {
        projectCount: admin.firestore.FieldValue.increment(1),
      });
    } else if (
      (oldStatus === "BEST PROJECT" || oldStatus === "COMPLETE") &&
      (newStatus === "DROPPED" || newStatus === "PENDING" || !newStatus)
    ) {
      bulk.update(firestore.doc(`/events/${context.params.eventID}`), {
        projectCount: admin.firestore.FieldValue.increment(-1),
      });
    }

    for (const uid of added)
      bulk.create(membersRef.doc(uid), {
        uid,
        accepted: false,
      });

    for (const uid of removed) bulk.delete(membersRef.doc(uid));

    await queueMails(
      bulk,
      context.params.eventID,
      context.params.teamID,
      change.after.get("lead"),
      added,
      change.after.get("name"),
      change.after.get("repo"),
      true,
    );

    return bulk
      .commit()
      .catch((err) =>
        console.error(err, `Team ID => ${context.params.teamID}`),
      );
  });

export const joinTeam = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid)
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User not authenticated",
    );

  if (!data.teamID)
    throw new functions.https.HttpsError(
      "invalid-argument",
      "teamID is required.",
    );

  if (!data.eventID)
    throw new functions.https.HttpsError(
      "invalid-argument",
      "eventID is required.",
    );

  const registration = await firestore
    .doc(`users/${context.auth.uid}/teams/${data.eventID}`)
    .get();

  if (registration.exists)
    throw new functions.https.HttpsError(
      "already-exists",
      "User already in a team for this event",
    );

  const batch = firestore.batch();

  const member = firestore.doc(
    `events/${data.eventID}/teams/${data.teamID}/members/${context.auth?.uid}`,
  );

  const team = firestore.doc(`users/${context.auth?.uid}/teams/${data.teamID}`);

  batch.update(member, { accepted: true }).create(team, {});

  await batch.commit().catch((error) => {
    if (error.code === 5)
      throw new functions.https.HttpsError(
        "permission-denied",
        "User not invited or team does exist.",
      );
    if (error.code === 6)
      throw new functions.https.HttpsError(
        "aborted",
        "User already joined this team",
      );

    console.error(error.code);

    throw new functions.https.HttpsError("unknown", "Something went wrong.");
  });

  return { success: true };
});

export const getColleges = functions.https.onRequest(async (req, res) => {
  const district = req.query.district;

  if (!district) res.status(200).send([]);

  const colleges = await firestore
    .collection("college")
    .where("district", "==", district)
    .get();

  const collegeList = colleges.docs.map((doc) => {
    const { name } = doc.data();

    return { label: name, value: doc.id };
  });

  res.status(200).send(collegeList);
});
