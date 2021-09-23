import React from "react";
import iconToClass from "../../helper/iconToClass";

const TechIcon = ({icon}) => {
  return (
    <li className="list-inline-item mx-3">
      <span>
        <div className="text-center">
          <i className={iconToClass(icon.name) + " colored"} style={{fontSize: "300%"}}>
            <p className="text-center" style={{fontSize: "30%"}}>
              {icon.name}
            </p>
          </i>
        </div>
      </span>
    </li>
  )
}
export default TechIcon;