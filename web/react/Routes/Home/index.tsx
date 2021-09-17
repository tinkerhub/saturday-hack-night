import { useHistory } from "react-router-dom";
import { signInWithPopup, GithubAuthProvider, Auth } from "firebase/auth";

/**
 * This function handles clicking on register button.
 */
function RegisterButton({auth}:{auth: Auth}) 
{
    const provider = new GithubAuthProvider();
    const history = useHistory();

    return (
        <button  
            className="bn632-hover bn18" 
            onClick={
                () => signInWithPopup(auth, provider)
                    .then(() => history.push("/event"))
                    .catch((error) => console.log(error))
            } 
        >
            Register Here
        </button>
    );
}

/**
 * The home page component.
 * 
 * @author Rohit T P
 * @returns { JSX.Element } index Component
 */
function Home({auth}:{auth: Auth}): JSX.Element
{
    return (
        <>
            <div className="navbar">
                <h1 className="headline">Saturday Hack Night</h1> 
                <hr className="line"></hr>
                <p className="subhead">Hey folks! Thought of a Hackathon around an API? Join us now for the most awaited event!</p>
            </div>
            <div className="about">
                <h1 className="abt-head">About</h1> 
                <hr className="line1"></hr>
                <p className="subhead1">TinkerHub brings you Saturday Hack Night!</p>
                <p className="p1"> 
                    Saturday Hack Night is not just your regular hackathon. Here, you will be building solutions/applications via API integration on every third Sunday of the month.<br/>
                    The needed resources, the respective API and documentation will be shared with you once you register.<br/> All you have to do is brainstorm and come up with a solution for your problem with the given API. <br/>
                    Once you are done with referring the documentation provided, team up (or even go solo!) and join the Discord server to take part in an exhilarating evening. 
                    The problem statement will be published on Saturday evening and you will have the whole night to build.
                    Stay tuned on TinkerHub Discord channels and Instagram page for the latest information and clues!
                </p>   
            </div>
            <div className="register">
                <h1 className="abt-head"> Are You Ready? Join Us now!</h1> <p className="p1">To participate in this Hacknight all you have to do is build something cool using GitHub API. Here are some ideas to get your creativity flowing,</p>   <br/>
                <RegisterButton auth={auth} />
                <h3 className="abt-head">Submitting Your Creations</h3> 
                <p>
                    <button className="bn33">1. Click on the massive button above to register!</button><br/><br/>
                    <button className="bn33">2. Create a repo by the team lead with Readme</button><br/><br/>
                    <button className="bn33">3. Create or Join a Team(If team, add your members)</button> <br/><br/>
                    <button className="bn33">4. Start Codding!</button>
                </p>
            </div>
            <div className="faq">
                <h1 className="abt-head">FAQ </h1> 
                <br/>
                <h3 className="p1">What is Saturday Hack Night?</h3>
                <p className="p2">Saturday Hack Night is a biweekly hackathon organized by TinkerHub. The focus of the event is to provide learners the opportunity to explore a unique API and build exciting projects. TinkerHub will provide any credits or mentorship needed while you only have to think of one thing, Build!
                </p>
                <h3 className="p1">Who can participate?</h3>
                <p className="p2">You. Are you passionate about tech? Do you like to build something unique? Are you that curious cat who loves to explore uncharted territory? Then this is your opportunity.
                </p>
                <h3 className="p1">What should the team size be?</h3>
                <p className="p2">Individual or maximum 3 members. You can participate on your own or team-up with your friends, the more the merrier, right?
                </p>
                <h3 className="p1">What is the schedule of the program?</h3>
                <p className="p2">Saturday evening 6 PM to 11 PM every odd saturday you will be able to take part in the program. Yes it is a recurring event and yes, you are welcome every time. </p>
                <h3 className="p1">Still have questions?</h3>
                <p className="p2">Contact our core team - you can get in tough with us on our Discord channel (you will be added on registration) or ping us directly.</p>
            </div>
        </>
    );
}

export default Home;
