import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-web-js/recipe/thirdparty';

async function githubSignIn() {
    try {
        const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
            providerId: 'github',
            authorisationURL: 'http://localhost:3000/auth',
        });
        window.location.assign(authUrl);
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert('Oops! Something went wrong.');
        }
    }
}
