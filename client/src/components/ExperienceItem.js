import React from "react";
import {VerticalTimelineElement} from "react-vertical-timeline-component";
import Badge from "react-bootstrap/Badge";

const ExperienceItem = ({item, icon}) => {
    return <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={item.year}
        iconStyle={{
            background: "#AE944F",
            color: "#fff",
            textAlign: "center",
        }}
        icon={<i className={icon + " experience-icon"}/>}
    >
        {/*<div style={{textAlign: "left", marginBottom: "4px"}}>*/}
        {/*    {mainTech}*/}
        {/*</div>*/}

        <h3
            className="vertical-timeline-element-title mb-2"
            style={{textAlign: "left"}}
        >
            {item.title}
        </h3>
        <h4
            className="vertical-timeline-element-subtitle"
            style={{textAlign: "left"}}
        >
            {item.institution}
        </h4>
        <h5
            className="vertical-timeline-element-subtitle"
            style={{textAlign: 'left'}}>
            {item.address}
        </h5>
        <div style={{textAlign: "left", marginTop: "15px"}}>
            {item.topics && item.topics.map((i, key) =>
                <Badge pill className="experience-badge mr-2 mb-2" key={key}>
                    {i}
                </Badge>
            )}
        </div>

        <div style={{textAlign: "left", marginTop: "15px"}}>
            <ul>
                {item.details && item.details.map((i, key) =>
                    <li className="mr-2 mb-2" key={key}>
                        {i}
                    </li>
                )}
            </ul>
        </div>
        {item.description &&
        <p
            className="vertical-timeline-element-subtitle"
            style={{textAlign: 'left', color: "#808080"}}>
            {item.description}
        </p>
        }
    </VerticalTimelineElement>
}

export default ExperienceItem;