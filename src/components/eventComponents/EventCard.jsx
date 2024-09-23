import React from 'react';
import "../../css/eventCard.css";

import vue from "/public/assets/images/vue.png";
import see_projects from "/public/assets/images/see_projects.png";
import more_info from "/public/assets/images/more_info.png";
import checkmark from "/public/assets/images/checkmark.png";

const EventCard = ({ event }) => {
  const { id, about, name, image, status, imageWhite, moreInfo, projectCount } = event;
  const { push, query } = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="singleEventCard">
      <div className="singleEventTop">
        <img src={vue.src} alt="" />
        <div className="singleEventCompletedProjects">
          <img src={checkmark.src} alt="" />
          <span className="cp_text">
            <span className="singleEventBold">12</span> COMPLETED PROJECTS
          </span>
        </div>
      </div>
      <div className="singleEventBottom">
        <h3 className="singleEventTitle">Vue.js</h3>
        <div className="singleEventDesc">
          
          <div className="singleEventButtons">
            <a href="" className="sinlgeEventsSeeProjects">
              <img src={see_projects.src} alt="" />
              See Projects
            </a>
            <a href="" className="singleEventMoreInfo">
              <img src={more_info.src} alt="" />
              More Info
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;