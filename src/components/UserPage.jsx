import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../user-page.css";
import { getBartersList } from "../redux/barter/barterActions";
import { useHistory } from "react-router";
import { logout } from "../redux/auth/authActions";
import { createBarter } from "../redux/barter/barterActions";

const UserPage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const barters = useSelector((state) => state.barters.barters);
  const dispatch = useDispatch();
  const history = useHistory();

  const [barterDirty, setBarterDirty] = useState(false);
  const [learnDirty, setLearnDirty] = useState(false);
  const [teachDirty, setTeachDirty] = useState(false);

  const [barterError, setBarterError] = useState("The field cannot be empty");
  const [learnError, setLearnError] = useState("The field cannot be empty");
  const [teachError, setTeachError] = useState("The field cannot be empty");

  const [isValid, setIsValid] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [barter, setBarter] = useState("");
  const [learn, setLearn] = useState("");
  const [teach, setTeach] = useState("");

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

  useEffect(() => {
    dispatch(getBartersList());
  }, [dispatch]);

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
    if (barterError || learnError || teachError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [barterError, learnError, teachError]);

  return (
    <div className="userpage-box box">
      <h3>Welcome, {currentUser.username}</h3>
      <div className="userpage-btns">
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            setIsFormOpen(!isFormOpen);
            setBarterDirty(false);
            setLearnDirty(false);
            setTeachDirty(false);
            setBarter("");
            setLearn("");
            setTeach("");
          }}
        >
          Create Barter
        </button>
        <button
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

      <h3>Available barters</h3>

      {isFormOpen && (
        <div className="new-barter barter-card">
          <form
            className="create-barter-form"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(createBarter({ currentUser, barter, learn, teach }));
              setIsFormOpen(!isFormOpen);
            }}
          >
            <p>Comment</p>
            <input
              type="text"
              className="create-barter-input"
              name="barter"
              value={barter}
              onChange={(e) => handleBarterChange(e)}
              onBlur={(e) => handleBlur(e)}
            ></input>
            {barterDirty && barterError && (
              <p className="error-message"> {barterError} </p>
            )}
            <div className="barters-offer">
              <div className="learn">
                <p>I want to learn</p>
                <input
                  type="text"
                  className="create-barter-input"
                  name="learn"
                  value={learn}
                  onChange={(e) => handleLearnChange(e)}
                  onBlur={(e) => handleBlur(e)}
                ></input>
                {learnDirty && <p className="error-message"> {learnError} </p>}
              </div>
              <div className="teach">
                <p>I can teach</p>
                <input
                  type="text"
                  className="create-barter-input"
                  name="teach"
                  value={teach}
                  onChange={(e) => handleTeachChange(e)}
                  onBlur={(e) => handleBlur(e)}
                ></input>
                {teachDirty && <p className="error-message"> {teachError} </p>}
              </div>
            </div>
            <button disabled={!isValid} className="btn submit-btn">
              Submit
            </button>
          </form>
        </div>
      )}
      <div className="barters-list">
        {barters &&
          barters.map((barter) => {
            return (
              <div key={barter.id} className="barter-card">
                <div className="barter-author">
                  By:&nbsp;<h4>{barter.author.username}</h4>
                </div>
                <div className="card-comments">
                  <p className="comment">{barter.barter}</p>
                </div>
                <div className="barters-offer">
                  <div className="learn">
                    <p>I want to learn</p>
                    <h4>{barter.learn}</h4>
                  </div>
                  <div className="teach">
                    <p>I can teach</p>
                    <h4>{barter.teach}</h4>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserPage;
