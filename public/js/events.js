const teamName = document.getElementById("teamName");
const repoURL = document.getElementById("repoURL");
const membersList = document.getElementById("members");

function showForm()
{
    new bootstrap.Modal(document.getElementById("staticBackdrop"), {}).show();
}

const uid = new Promise((resolve, reject) =>
    firebase.auth().onAuthStateChanged((user) =>
    {
        if (user)
            resolve(user.uid);
        else
            reject(window.location.href = "/");
    }));

const eventID = new Promise(async (resolve) =>
    (await firebase.firestore().collection("events").get()).forEach((event) => resolve(event.id)));

document.getElementById("registerForm").addEventListener("submit", async (e) =>
{
    e.preventDefault();

    const name = teamName.value;
    const repo = repoURL.value;
    const members = [];

    const users = firebase.firestore().collection("users");

    const lead = await uid;

    window.alert("Creating Team Please wait...");

    for (const githubID of (membersList.value || "").split(","))
    {
        console.log(githubID);
        const user = await users.where("githubID", "==", githubID).get();

        user.forEach((doc) =>
        {
            if (doc.get("uid") != lead)
                members.push(doc.get("uid"));
        });
    }

    const teamsRef = firebase.firestore().collection(`/events/${await eventID}/teams`);

    await teamsRef.add({
        name,
        repo,
        members,
        lead
    })
        .then(() => window.alert("Team Created, check you email for more details."))
        .catch(error => (window.alert("Oops something went wrong."), console.error(error)));

    new bootstrap.Modal(document.getElementById("staticBackdrop"), {}).hide();
});

if (new Date().getTime() > new Date("September 4, 2021 4:00:00 PM UTC+5:30").getTime())
{
    document.getElementById("eventCard").hidden = true;
    document.getElementById("noEvents").hidden = false;
}