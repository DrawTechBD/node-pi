import React from "react";
import Typical from "react-typical";

const Header = ({name, titles}) => {
    const titlesArray = titles.map(x => [x.toUpperCase(), 1500]).flat();
    const HeaderTitleTypeAnimation = React.memo(() =>
        <Typical className="title-styles" steps={titlesArray} loop={50}/>
    );
    return (
      <header id="home" style={{ height: window.innerHeight, display: 'block' }}>
        <div className="row aligner" style={{height: '100%'}}>
          <div className="col-md-12">
            <div>
              <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"/>
              <br/>
              <h1 className="mb-0">
                <Typical steps={[name]} wrapper="p" />
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

export default Header;
