import React from "react";
import SkillIcon from "./icon/SkillIcon";

const Skills = ({skills}) => {
  // var data = skills.icons.map(function (skill, i) {
  //   return (
  //     <li className="list-inline-item mx-3" key={i}>
  //           <span>
  //             <div className="text-center skills-tile">
  //               <i className={skill.class} style={{fontSize: "220%"}}>
  //                 <p
  //                   className="text-center"
  //                   style={{fontSize: "30%", marginTop: "4px"}}
  //                 >
  //                   {skill.name}
  //                 </p>
  //               </i>
  //             </div>
  //           </span>
  //     </li>
  //   );
  // });

  const icons = (list) => list.map((icon, i) => <SkillIcon icon={icon} key={i}/>);

  return (
    <section id="skills">
       <div className="col-md-12">
         <div className="col-md-12">
           <h1 className="section-title">
             <span className="text-white">Skills</span>
           </h1>
         </div>
         <div className="col-md-12 text-center">
           <h3 className="skills-subtitle"><span className="text-white">Programming Language</span></h3>
           <ul className="list-inline mx-auto skill-icon">
             {skills.language && icons(skills.language)}
           </ul>
         </div>
         {
           skills.platform.map((platform, i) => (
             <div className="col-md-12 text-center" style={{marginTop: 50}} key={i}>
               <h3 className="skills-subtitle"><span className="text-white">{platform.name}</span></h3>
               <ul className="list-inline mx-auto skill-icon">
                 {platform.framework && icons(platform.framework)}
               </ul>
             </div>
           ))
         }
       </div>
     </section>
  );
}

export default Skills;
