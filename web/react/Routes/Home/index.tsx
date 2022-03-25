import {useNavigate} from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQS = [
    {
        question: "What is Saturday Hack Night?",
        answer: `Saturday Hack Night is a biweekly hackathon organized by TinkerHub. The focus of the
                    event is to provide learners the opportunity to explore a unique API and build exciting projects.
                    TinkerHub will provide any credits or mentorship needed while you only have to think of one thing,
                    Build!`
    },
    {
        question: "Who can participate?",
        answer: `You. Are you passionate about tech? Do you like to build something unique? Are you
                    that curious cat who loves to explore uncharted territory? Then this is your opportunity.`
    }
    ,
    {
        question: "What should the team size be?",
        answer: `Individual or maximum 3 members. You can participate on your own or team-up with your
                    friends, the more the merrier, right?`
    }
    ,
    {
        question: "What is the schedule of the program?",
        answer: `Saturday evening 6 PM to 11 PM every odd saturday you will be able to take part in the
                    program. Yes it is a recurring event and yes, you are welcome every time.`
    }
    ,
    {
        question: "Still have questions?",
        answer: `Contact our core team - you can get in tough with us on our Discord channel (you will
                    be added on registration) or ping us directly.`
    }
];

/**
 * The home page component.
 *
 * @author Rohit T P
 * @returns { JSX.Element } index Component
 */
function Home(): JSX.Element
{
    const navigate = useNavigate();

    return (
        <>
            <div className="content">
                <h1 className="abt-head">What is SHN ?</h1>
                <p className="p1">
                    Saturday Hack Night is not just your regular hackathon. Here, you will be building
                    solutions/applications via API integration on every third Sunday of the month.<br/>
                    The needed resources, the respective API and documentation will be shared with you once you
                    register.<br/> All you have to do is brainstorm and come up with a solution for your problem with
                    the given API. <br/>
                    Once you are done with referring the documentation provided, team up (or even go solo!) and join the
                    Discord server to take part in an exhilarating evening.
                    The problem statement will be published on Saturday evening and you will have the whole night to
                    build.
                    Stay tuned on TinkerHub Discord channels and Instagram page for the latest information and clues!
                </p>
            </div>
            <div className="content">
                <h1 className="abt-head"> Are You Ready? Join Us now!</h1>
                <p className="p1">Thrilled to start building ? Wait no more, click on the button below and register a
                    team for one of the upcoming events.</p>
                <button
                    className="bn632-hover bn18"
                    onClick={() => navigate("/event")}
                >
                    Goto Events Page
                </button>
                <h3 className="abt-head">Submitting Your Creations</h3>
                <p>
                    <button className="bn33">1. Create a repo and initialise it with a README</button>
                    <button className="bn33">2. Go to events page and create a team ( only team lead )</button>
                    <button className="bn33">3. If you are a team member accept team invite by clicking on the email
                        link.
                    </button>
                    <button className="bn33">4. Start Codding!</button>
                </p>
            </div>
            <div className="content">
                <h1 className="abt-head">FAQ </h1>
                <div style={{padding: "1rem"}}>
                    {FAQS.map(({question, answer}, i) =>
                        <Accordion key={i}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
