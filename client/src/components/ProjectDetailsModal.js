import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import TechIcon from "./icon/TechIcon";
import Badge from "react-bootstrap/Badge";
import PlatformIcon from "./icon/PlatformIcon";
class ProjectDetailsModal extends Component {
  render() {
    if (this.props.data) {
      const {technologies, images,tags, platforms} = this.props.data;
      var title = this.props.data.title;
      var description = this.props.data.description;
      var url = this.props.data.url;

      // Images
      if (images) {
        var img = images.map((elem, i) => <div key={i} data-src={elem} />);
      }

      // Technologies
      if (technologies) {
        var tech = technologies.map((icon, i) => <TechIcon key={i} icon={icon}/>);
      }

      // Platforms
      if(platforms){
        var platform = platforms.map((item, key) => <PlatformIcon data={item}/>);
      }

      // Tags
      if(this.props.data.tags) {
        var tag = tags.map((tag, key) =>
          <Badge pill className="experience-badge mx-2" key={key}>
            {tag}
          </Badge>
        );
      }

    }
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-inside"
      >
        <span onClick={this.props.onHide} className="modal-close">
          <i className="fas fa-times fa-3x close-icon"/>
        </span>
        <div className="col-md-12">
          {/*Image Slider*/}
          <div className="col-md-10 mx-auto" style={{ paddingBottom: "50px" }}>
            <div className="slider-tab">
              <span
                className="iconify slider-iconfiy"
                data-icon="emojione:red-circle"
                data-inline="false"
                style={{ marginLeft: "5px" }}
              ></span>{" "}
              &nbsp;{" "}
              <span
                className="iconify slider-iconfiy"
                data-icon="twemoji:yellow-circle"
                data-inline="false"
              ></span>{" "}
              &nbsp;{" "}
              <span
                className="iconify slider-iconfiy"
                data-icon="twemoji:green-circle"
                data-inline="false"
              ></span>
            </div>
            <AwesomeSlider
              cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
              animation="scaleOutAnimation"
              className="slider-image"
            >
              {img}
            </AwesomeSlider>
          </div>

          {/*Project Details*/}
          <div className="col-md-10 mx-auto">

            {/*Project Title with Link*/}
            <h3 style={{ padding: "5px 5px 0 5px" }}>
              {title}
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-href"
                >
                  <i
                    className="fas fa-external-link-alt"
                    style={{marginLeft: "10px"}}
                  />
                </a>
              ) : null}
            </h3>

            {/*Description*/}
            <p className="modal-description">{description}</p>

            {/*Technologies*/}
            <div className="col-md-12 text-left">
              <strong>Technologies</strong>
              <ul className="list-inline mx-auto mt-2">{tech}</ul>
            </div>

            {/*Platforms*/}
            <div className="col-md-12 text-left">
              <strong>Platforms</strong>
              <ul className="list-inline mx-auto mt-2">{platform}</ul>
            </div>

            {/*Tags*/}
            <div className="col-md-12 text-left mb-5">
              <strong>Tags&nbsp;</strong>
              {tag}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ProjectDetailsModal;
