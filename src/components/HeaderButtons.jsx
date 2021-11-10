import React from "react";
import { useHistory } from "react-router-dom";

const HeaderButtons = () => {
  const history = useHistory();
  return (
    <div className="header-buttons">
      <button onClick={() => {history.push("/register");}} className="btn">
        Register
      </button>

      <span>or</span>

      <button onClick={() => {history.push("/login");}} className="btn">
        Log in
      </button>

      <p>to start experience exchange</p>
    </div>
  );
};

export default HeaderButtons;
