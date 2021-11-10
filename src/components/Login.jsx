import React, { useState, useEffect } from "react";
import { loginUser } from "../redux/auth/authActions";
import HeaderButtons from "./HeaderButtons";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameDirty, setUsernameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [usernameError, setUsernameError] = useState(
    "The field cannot be empty"
  );
  const [passwordError, setPasswordError] = useState(
    "The field cannot be empty"
  );
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();
  const {currentUser, authError} = useSelector(state => state.auth)
    

  useEffect(() => {
    if (usernameError || passwordError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [usernameError, passwordError]);

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "username":
        setUsernameDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        setUsernameDirty(false)
        setPasswordDirty(false)
    }
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (!e.target.value) {
      setUsernameError("The field cannot be empty");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("The password must be 6 or more characters");
      if (!e.target.value) {
        setPasswordError("The field cannot be empty");
      }
    } else {
      setPasswordError("");
    }
  };

  if (currentUser) return <Redirect to='/userpage' />

  return (
    <div className="login-box box">
      <HeaderButtons />
      <form className="form" onSubmit={(e) => {
            e.preventDefault();
            dispatch(loginUser({ username, password }));
          }}>
        <label htmlFor="username">Username</label>
        <input
        className='login-input'
          id="username"
          type="text"
          name="username"
          value={username}
          onBlur={(e) => handleBlur(e)}
          onChange={(e) => handleUsernameChange(e)}
        />
        {usernameDirty && usernameError && (
          <p className="error-message"> {usernameError} </p>
        )}
        <br />
        <label htmlFor="password">Password</label>
        <input
        className='login-input'
          id="password"
          type="password"
          name="password"
          placeholder=""
          value={password}
          onBlur={(e) => handleBlur(e)}
          onChange={(e) => handlePasswordChange(e)}
        />
        {passwordDirty && passwordError && (
          <p className="error-message"> {passwordError} </p>
        )}
        <br />
        <button
          
          disabled={!isValid}
          className="login-btn btn"
        >
          Log in
        </button>
      </form>
      {authError && <p className="error-message login-error-p">Username/Password is invalid</p>}
    </div>
  );
};

export default Login;
