import React, {Component, useState} from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

const Projects = ({projects}) => {
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [deps, setDeps] = useState({});
  const show = (data) => {
    setDetailsModalShow(true);
    setDeps(data);
  }
  const hide = () => {
    setDetailsModalShow(false);
    setDeps(undefined);
  }
  //
  // let detailsModalShow = (data) => {
  //   // this.setState({ detailsModalShow: true, deps: data });
  // };
  //
  // let detailsModalClose = () => {
  //   // this.setState({ detailsModalShow: false })
  // };


  return (
    <section id="portfolio">
      <div className="col-md-12">

        {/*Section Title*/}
        <h1 className="section-title" style={{color: "black"}}>
          <span>Projects</span>
        </h1>

        {/*Projects*/}
        <div className="col-md-12 mx-auto">
          <div className="row mx-auto">
            {projects && projects.map((project, key) =>
              <div
                className="col-sm-12 col-md-6 col-lg-4"
                key={key}
                style={{cursor: "pointer"}}
              >
                <span className="portfolio-item d-block">

                  {/*Modal Opening Click Handler*/}
                 <div className="foto" onClick={() => show(project)}>
                  <div>
                    {/*Image Viewer*/}
                    <img
                      src={project.images[0]}
                      alt="projectImages"
                      height="230"
                      style={{marginBottom: 0, paddingBottom: 0, position: 'relative'}}
                    />

                    {/*Project Start Time*/}
                    <span className="project-date">{project.started}</span>
                    <br/>

                    {/*Project Title*/}
                    <p className="project-title-settings mt-3">
                      {project.title}
                    </p>
                  </div>
                  </div>
                </span>
              </div>
            )}
          </div>
        </div>
        <ProjectDetailsModal
          show={detailsModalShow}
          onHide={hide}
          data={deps}
        />
      </div>
    </section>
  );
}

export default Projects;
