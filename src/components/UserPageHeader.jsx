import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../redux/auth/authActions";
import { createBarter, getBartersList } from "../redux/barter/barterActions";

const UserPageHeader = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const [barter, setBarter] = useState("");
  const [learn, setLearn] = useState("");
  const [teach, setTeach] = useState("");
  const [barterDirty, setBarterDirty] = useState(false);
  const [learnDirty, setLearnDirty] = useState(false);
  const [teachDirty, setTeachDirty] = useState(false);
  const [barterError, setBarterError] = useState("The field cannot be empty");
  const [learnError, setLearnError] = useState("The field cannot be empty");
  const [teachError, setTeachError] = useState("The field cannot be empty");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "barter":
        setBarterDirty(true);
        break;
      case "learn":
        setLearnDirty(true);
        break;
      case "teach":
        setTeachDirty(true);
        break;
      default:
        setBarterDirty(false);
        setLearnDirty(false);
        setTeachDirty(false);
    }
  };
  const handleBarterChange = (e) => {
    e.persist();
    setBarter(e.target.value);
    if (!e.target.value) {
      setBarterError("The field cannot be empty");
    } else {
      setBarterError("");
    }
  };
  const handleLearnChange = (e) => {
    e.persist();
    setLearn(e.target.value);
    if (!e.target.value) {
      setLearnError("The field cannot be empty");
    } else {
      setLearnError("");
    }
  };
  const handleTeachChange = (e) => {
    e.persist();
    setTeach(e.target.value);
    if (!e.target.value) {
      setTeachError("The field cannot be empty");
    } else {
      setTeachError("");
    }
  };
  useEffect(() => {
    dispatch(getBartersList());
  }, [dispatch]);

  useEffect(() => {
    if (barterError || learnError || teachError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [barterError, learnError, teachError]);

  const handleOpenForm = () => {
    setIsFormOpen(!isFormOpen);
    setBarterDirty(false);
    setLearnDirty(false);
    setTeachDirty(false);
  };

  const handleCreateBarter = () => {
    dispatch(createBarter({ barter, learn, teach }));
    setBarter("");
    setLearn("");
    setTeach("");
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="userpage-box box">
      <h3>Welcome, {currentUser.username}</h3>
      <div className="userpage-btns">
        <button name="create-barter" className="btn" onClick={() => handleOpenForm()}>
          Create Barter
        </button>
        <button
          name="logout"
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout(currentUser));
            history.push("/");
          }}
        >
          Log out
        </button>
      </div>

      {isFormOpen && (
        <div className="new-barter barter-card">
          <form
            className="create-barter-form"
            onSubmit={(e) => {
              e.preventDefault()
              handleCreateBarter();
            }}
          >
            <p>Comment</p>
            <textarea
              type="text"
              className="textarea"
              name="barter"
              value={barter}
              onChange={(e) => handleBarterChange(e)}
              onBlur={(e) => handleBlur(e)}
            ></textarea>
            {barterDirty && barterError && (
              <p className="error-message"> {barterError} </p>
            )}
            <div className="barters-offer">
              <div className="learn">
                <p className="skills-tag">I want to learn</p>
                <textarea
                  type="text"
                  className="textarea"
                  name="learn"
                  value={learn}
                  onChange={(e) => handleLearnChange(e)}
                  onBlur={(e) => handleBlur(e)}
                ></textarea>
                {learnDirty && <p className="error-message"> {learnError} </p>}
              </div>
              <div className="teach">
                <p className="skills-tag">I can teach</p>
                <textarea
                  type="text"
                  className="textarea"
                  name="teach"
                  value={teach}
                  onChange={(e) => handleTeachChange(e)}
                  onBlur={(e) => handleBlur(e)}
                ></textarea>
                {teachDirty && <p className="error-message"> {teachError} </p>}
              </div>
            </div>
            <button disabled={!isValid} className="btn submit-btn">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserPageHeader;
