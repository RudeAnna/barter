import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import HeaderButtons from "./HeaderButtons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [usernameDirty, setUsernameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [password2Dirty, setPassword2Dirty] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [usernameError, setUsernameError] = useState(
    "The field cannot be empty"
  );
  const [passwordError, setPasswordError] = useState(
    "The field cannot be empty"
  );
  const [password2Error, setPassword2Error] = useState(
    "The field cannot be empty"
  );
  const [registerError, setRegisterError] = useState("");
  const [registerUser, setRegisterUser] = useState(null);

  useEffect(() => {
    if (usernameError || passwordError || password2Error) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [usernameError, passwordError, password2Error]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length > 0) {
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

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    if (e.target.value !== password) {
      setPassword2Error("Passwords do not match");
    } else {
      setPassword2Error("");
    }
  };

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "username":
        setUsernameDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "password2":
        setPassword2Dirty(true);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      redirect: "follow",
    };
    setRegisterError("");
    fetch("http://localhost:4000/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code && result.code >= 400 && result.message) {
          throw new Error(result.message);
        }
        console.log(result);
        setRegisterUser(result);
      })
      .catch((error) => {
        setRegisterError(error.message);
      });

    setUsername("");
    setPassword("");
    setPassword2("");
  };
  if (registerUser) return <Redirect to="/register-success" />;

  return (
    <div className="register-box box">
      <HeaderButtons />
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username">Username</label>
        <input
        className='login-input'
          type="text"
          name="username"
          value={username}
          onChange={(e) => handleUsernameChange(e)}
          onBlur={(e) => handleBlur(e)}
        />
        {usernameDirty && usernameError && (
          <p className="error-message"> {usernameError} </p>
        )}
        <br />
        <label htmlFor="password">Password</label>
        <input
        className='login-input'
          type="password"
          name="password"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          onBlur={(e) => handleBlur(e)}
        />
        {passwordDirty && passwordError && (
          <p className="error-message"> {passwordError} </p>
        )}

        <br />
        <label htmlFor="password2">Confirm password</label>
        <input
          className='login-input'
          type="password"
          name="password2"
          value={password2}
          onChange={(e) => handlePassword2Change(e)}
          onBlur={(e) => handleBlur(e)}
        />
        {password2Dirty && password2Error && (
          <p className="error-message"> {password2Error} </p>
        )}
        <button disabled={!isValid} className="register-btn btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
