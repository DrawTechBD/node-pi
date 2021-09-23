import React from "react";

const SkillIcon = ({icon}) => {
  return (
    <li className="list-inline-item mx-3">
      <span>
        <div className="text-center skills-tile">
          <i className={icon.icon + " colored"} style={{fontSize: "220%"}}>
            <p
              className="text-center"
              style={{fontSize: "30%", marginTop: "4px"}}
            >
              {icon.name}
            </p>
          </i>
        </div>
      </span>
    </li>
  )
}

export default SkillIcon;