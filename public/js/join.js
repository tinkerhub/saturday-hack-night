const uid = new Promise((resolve, reject) =>
    firebase.auth().onAuthStateChanged((user) =>
    {
        if (user)
            resolve(user.uid);
        else
            firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
                .then((result) => resolve(result.user.uid))
                .catch((error) => reject(error));
    }));

if (location.href.split("#").length > 2)
    joinTeam(location.href.split("#")[1], location.href.split("#")[2]);
else
    document.getElementById("loader").innerHTML = "<h6>Invalid Invite Link</h6>";


async function joinTeam(eventID, teamID)
{
    try
    {
        await uid;
        await firebase.functions().httpsCallable('joinTeam')({ teamID, eventID });
        document.getElementById("loader").innerHTML = "<h6>Joined the team 🎉</h6>";
    }
    catch (error)
    {
        document.getElementById("loader").innerHTML = `<h6>${error.message}</h6>`;
    }
}
