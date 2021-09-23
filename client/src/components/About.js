import React from "react";
import {Icon} from "@iconify/react";
import angularIcon from "@iconify/icons-logos/angular-icon";
import reactIcon from "@iconify/icons-logos/react";
import vueIcon from "@iconify/icons-logos/vue";
import SkillIcon from "./icon/SkillIcon";

// class About extends Component {
//   render() {
//     if (this.props.sharedBasicInfo) {
//       var profilepic = this.props.sharedBasicInfo.image;
//     }
//     if (this.props.resumeBasicInfo) {
//       var sectionName = this.props.resumeBasicInfo.section_name.about;
//       var hello = this.props.resumeBasicInfo.description_header;
//       var about = this.props.resumeBasicInfo.description;
//     }
function About({image, about, core}) {
  // useEffect(() => {
  //     if (props.sharedBasicInfo) {
  //         var profilepic = props.sharedBasicInfo.image;
  //     }
  //     if (props.resumeBasicInfo) {
  //         var sectionName = props.resumeBasicInfo.section_name.about;
  //         var hello = props.resumeBasicInfo.description_header;
  //         var about = props.resumeBasicInfo.description;
  //     }
  // }, []);
  console.log(image);
  return (
    <section id="about">
      <div className="col-md-12">
        <h1 style={{color: "black"}}>
          <span>about</span>
        </h1>
        <div className="row center mx-auto mb-5">
          <div className="col-md-4 mb-5 center">
            <div className="polaroid">
                <span style={{cursor: "auto"}}>
                  <img
                    height="220px"
                    src={image}
                    alt="Avatar placeholder"
                  />
                  <div className="mt-3">
                  {core && core.map((item) => <i className={item.icon+ " colored"} style={{fontSize: 35, margin: "9% 5% 0 5%"}} />)}
                  </div>
                </span>
            </div>
          </div>

          <div className="col-md-8 center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                    <span
                      className="iconify"
                      data-icon="emojione:red-circle"
                      data-inline="false"
                    ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:yellow-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:green-circle"
                    data-inline="false"
                  ></span>
                </div>
                <div
                  className="card-body font-trebuchet text-justify ml-3 mr-3"
                  style={{
                    height: "auto",
                    fontSize: "132%",
                    lineHeight: "200%",
                  }}
                >
                  <br/>
                  <span className="wave">{"hello"} :) </span>
                  <br/>
                  <br/>
                  {about}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
