import React from "react";

const Footer = ({socials, name}) => {
    // const networks = data.social === null ||  ? null : data.social.map(function (network) {
    //     return (
    //         <span key={network.name} className="m-4">
    //          <a href={network.url} target="_blank" rel="noopener noreferrer">
    //            <i className={network.class}/>
    //          </a>
    //        </span>
    //     );
    // });
    console.log(socials);

    return (
        <footer>
            <div className="col-md-12">
                <div className="social-links">
                    {socials.map((social) =>
                        <span key={social.name} className="m-4">
                                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                                    <i className={social.icon}/>
                                  </a>
                        </span>
                    )}
                </div>

                <div className="copyright py-4 text-center">
                    <div className="container">
                        <small>
                            Copyright &copy;{" "}
                            {name
                                ? name
                                : "???"}
                        </small>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
