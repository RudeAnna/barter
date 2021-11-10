import { useHistory } from "react-router-dom";

const RegisterSuccess = () => {
  let history = useHistory();

  return (
    <div className="register-success box">
      <h3>Registration Successful</h3>
      <div className="success-logo" />
      <p>Your account has been created</p>
      <button
        className="login-btn btn"
        onClick={() => {
          history.push("/login");
        }}
      >
        Log in
      </button>
    </div>
  );
};

export default RegisterSuccess;
