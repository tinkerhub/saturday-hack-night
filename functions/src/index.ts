import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

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
