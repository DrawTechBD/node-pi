import React from "react";
import iconToClass from "../../helper/iconToClass";

/**
 *
 * @param (String) data
 * @returns {JSX.Element}
 * @constructor
 */
const PlatformIcon = ({data}) => {
  return (
    <li className="list-inline-item mx-3">
      <span>
        <div className="text-center">
          <i className={iconToClass(data)} style={{fontSize: "300%"}}>
            <p className="text-center" style={{fontSize: "30%"}}>
              {data}
            </p>
          </i>
        </div>
      </span>
    </li>
  )
}
export default PlatformIcon;