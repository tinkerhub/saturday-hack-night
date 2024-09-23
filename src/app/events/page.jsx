import React from 'react';
import calendarLogo from "/public/assets/images/calendar_logo.svg";
import streamlit from "/public/assets/images/streamlit_main.svg";
import "./page.css";
import EventCard from '@/components/eventComponents/EventCard';
import Timer from '@/components/Timer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getEvents } from '/src/app/api/api.js';
import firebase from '@firebase/app';
const Event = {
  id: Number,
  name: String,
  // Add other event properties here
};

export function EventsSection() {
  const [events, setEvents] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getEvents()
      .then((data) => setEvents(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (events.length === 0) {
    return <div>No events found</div>;
  }

  return (
    <div className='eventsPage'>
      <Navbar/>

      <div className='events_page_blur events_blur1'></div>
      <div className='events_page_blur events_blur2'></div>
      {/* <div className='events_page_blur events_blur3'></div> */}

      <div className="hero">

        <div className="HerotitleSection">
          <h3>Saturday HackNight <span>this week</span></h3>
        </div>

        <div className="HeroBottomSection">
          
          <div className="HeroLeft">
            <Timer/>
            <div className="eventDetails">
              <div className="eventTitleLeft">Streamlit</div>
              <div className="eventDate"><img src={calendarLogo.src} alt="" /> <span>Sat May 18 2024</span> </div>
              <div className="leftButtons">
                <div className="registerButton">REGISTER</div>
                <div className="infoButton">More Info</div>
              </div>

            </div>
          </div>

          <div className="HeroRight">

            <img src={streamlit.src} alt="" />
            <p>streamlit is an open-source python framework to deliver dynamic data with only a few lines of code</p>
          </div>




        </div>



      </div>
      <div className="eventCardSection">
        <h3 className = "eventCardSectionHeading">EXPOLORED AREAS</h3>
        <div className="eventCards">


          {
            events.map((event, index) => {
              return (
                <div key={index}>
                  <EventCard event={event} />
                </div>
              )
            })
          }

        </div>

      </div>

      <Footer/>

    </div> 
  )
}
