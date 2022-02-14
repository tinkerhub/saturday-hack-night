import homeTitle from '../../../assets/homeTitle.png';
import homeSubTitle from '../../../assets/homeSubTitle.png';
import aboutTitle from '../../../assets/aboutTitle.png'
import faqTitle from '../../../assets/faqTitle.png'

import './home.css';
import { Link } from 'react-scroll';
import accordionData from './accordianData.json'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../../components/Navbar/Navbar';
function Home(){
    library.add(faArrowDown);
    return(
        <div className="home">
        <Navbar/>
        <section className="container" id="home">
            <img src={homeTitle} className="homeTitleImg" alt="Saturday Hack Night"/>
            <br/>
            <img src={homeSubTitle} className="homeSubTitleImg" alt="NOT A HACKATHON"/>
            <br/>
            <Link activeClass='' className="btnScroll" spy={true} smooth={true} offset={-100} duration={500} to="about"><FontAwesomeIcon icon="arrow-down"/> &nbsp; More</Link>
        </section>
        <br/>
        <section className="container" id="about">
           <img src={aboutTitle} className="aboutTitleImg" alt="About"/>
            <div className="aboutText">
                Saturday Hack Night is not just your regular hackathon.
                Here, you will be building solutions/applications via API integration on
                every first &amp; third Saturday of the month.
                The needed resources, the respective API and documentation will be shared with you 
                once you register. All you have to do is brainstorm and come up with a solution for
                your problem with the given API. Once you are done with referring the documentation
                provided, team up (or even go solo!) and join the Discord server to take part in an
                exhilarating evening. The problem statement will be published on Saturday
                evening and you will have the whole night to build. Stay tuned on TinkerHub
                Discord channels and Instagram page for the latest information and clues!
            </div>
        </section> 
        
        <section className="container" id="faq">
            <img src={faqTitle} className="faqTitleImg" alt="FAQ"/>
            <br/>
            <Accordion>
            {
                accordionData.map((value,key) => {
                    return <AccordionItem key={key}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {value.question}
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                {value.answer}
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                })
            }
            </Accordion>
        </section>
        <div className="footer">
            Saturday HackNight 2022
        </div>
        </div>
    )
}
export default Home;