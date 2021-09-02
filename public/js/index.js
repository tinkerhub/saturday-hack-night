// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl)
        {
            if (!authResult.additionalUserInfo.isNewUser)
                return true;

            const userRef = firebase.firestore().collection("users").doc(authResult.user.uid);

            userRef.set(
                {
                    phno: null,
                    campusName: null,
                    campusID: null,
                    githubID: authResult.additionalUserInfo.profile.login || null,
                    accessToken: authResult.credential.accessToken || null
                }, 
                { merge: true })
                    .then(() => window.location.href = "events");

            return false;
        },
        uiShown: function ()
        {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'events',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ]
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);