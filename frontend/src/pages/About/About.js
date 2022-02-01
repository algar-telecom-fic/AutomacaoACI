import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";

import "./styles.css";

const About = (props) => {
  const [getStyle, setStyle] = useState("row pb-5 px-5 m-5 bg-light rounded text-center");

  useEffect(() => {
    if (props.header) {
      setStyle("row pb-5 px-sm-5 m-auto bg-light rounded text-center");
    }
  }, [props.header]);

  return (
    <div className={getStyle}>
      {props.header ? <div className="h5">Tenant</div> : <Header title="About" />}
      <div className="h4">Version 1.0</div>
      <div className="h5">
        <a href="https://github.com/algar-telecom-fic/AutomacaoACI" target="_blank" rel="noopener noreferrer">
          Link github
        </a>
      </div>
    </div>
  );
};

export default About;
