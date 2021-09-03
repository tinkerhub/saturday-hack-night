// async function updateUser(photoURL: string, uid: string)
// {
// 	const parts = photoURL?.split("/") as unknown as string;
// 	const idNo = parts[parts.length - 1].split("?")[0];

// 	const github = await fetch(`https://api.github.com/user/${idNo}`).then((response) => response.json());

// 	const data = {
// 		githubID: github.login,
// 		repos: github.repos_url || null,
// 	};

// 	return firestore.collection("users").doc(uid).set(data, {merge: true});
// }

// async function addAllRepos()
// {
// 	const users = await firestore.collection("/events/kCx0wuk9StVqvufGTz68/teams").get();

// 	console.log(users.size);

// 	for (const user of users.docs)
// 		await setUpGitRepo("kCx0wuk9StVqvufGTz68", user.id, user.get("repo"), user.get("name"));

// 	console.log("done for real");
// }