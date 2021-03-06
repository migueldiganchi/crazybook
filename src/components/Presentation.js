import React from "react";
import { NavLink } from "react-router-dom";

function Presentation() {
  return (
    <div className="App-presentation">
      <div className="text-center logo-holder">
        <i className="fas fa-smile-wink" />
      </div>
      <p className="text-box">
        <b>Free people news</b>
      </p>
      <NavLink to="/auth" className="do do-primary">
        <i className="fas fa-plug" />
        <span>Access here to post</span>
      </NavLink>
    </div>
  );
}

export default Presentation;
