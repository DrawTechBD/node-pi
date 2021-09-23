import React from "react";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";
import ExperienceItem from "./ExperienceItem";

const Experience = ({experiences}) => {

    return (
        <section id="resume" className="pb-5">
            <div className="col-md-12 mx-auto">
                <div className="col-md-12">
                    <h1 className="section-title" style={{color: "black"}}>
                      <span className="text-black" style={{textAlign: "center"}}>
                        Experience
                      </span>
                    </h1>
                </div>
            </div>
            {experiences.map((experience, key) => <div className="col-md-8 mx-auto" style={{marginBottom: 50}}>
                <h3 className="skills-subtitle" style={{color: "black"}}>
                    <span className="text-black" style={{textAlign: "center"}}>
                        {experience.name}
                    </span>
                </h3>
                <VerticalTimeline>
                    {experience.experiences.map((item, key) =>
                        <ExperienceItem item={item} icon={experience.icon} key={key}/>
                    )}

                </VerticalTimeline>
            </div>)}

        </section>
    );
}

export default Experience;
