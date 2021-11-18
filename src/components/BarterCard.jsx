import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  deleteBarter,
  getBartersList,
  editBarter,
  addComment,
  deleteComment,
} from "../redux/barter/barterActions";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineSaveAlt } from "react-icons/md";

const BarterCard = ({ barter }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(false);
  const [barterEditDirty, setBarterEditDirty] = useState(false);
  const [learnEditDirty, setLearnEditDirty] = useState(false);
  const [teachEditDirty, setTeachEditDirty] = useState(false);

  const [barterEditError, setBarterEditError] = useState(
    "The field cannot be empty"
  );
  const [learnEditError, setLearnEditError] = useState(
    "The field cannot be empty"
  );
  const [teachEditError, setTeachEditError] = useState(
    "The field cannot be empty"
  );
  const [newCommentError, setNewCommentError] = useState(
    "The field cannot be empty"
  );

  const [currentBarter, setCurrentBarter] = useState("");
  const [newComment, setNewComment] = useState("");

  const [barterEdit, setBarterEdit] = useState("");
  const [learnEdit, setLearnEdit] = useState("");
  const [teachEdit, setTeachEdit] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "comment-edit":
        setBarterEditDirty(true);
        break;
      case "learn-edit":
        setLearnEditDirty(true);
        break;
      case "teach-edit":
        setTeachEditDirty(true);
        break;
      default:
        setBarterEditDirty(false);
        setLearnEditDirty(false);
        setTeachEditDirty(false);
    }
  };

  const handleBarterEditChange = (e) => {
    e.persist();
    setBarterEdit(e.target.value);
    if (!e.target.value) {
      setBarterEditError("The field cannot be empty");
    } else {
      setBarterEditError("");
    }
  };
  const handleLearnEditChange = (e) => {
    e.persist();
    setLearnEdit(e.target.value);
    if (!e.target.value) {
      setLearnEditError("The field cannot be empty");
    } else {
      setLearnEditError("");
    }
  };
  const handleTeachEditChange = (e) => {
    e.persist();
    setTeachEdit(e.target.value);
    if (!e.target.value) {
      setTeachEditError("The field cannot be empty");
    } else {
      setTeachEditError("");
    }
  };
  const handleNewCommentChange = (e) => {
    e.persist();
    setNewComment(e.target.value);
    if (!e.target.value) {
      setNewCommentError("The field cannot be empty");
    } else {
      setNewCommentError("");
    }
  };

  useEffect(() => {
    dispatch(getBartersList());
  }, [dispatch]);

  useEffect(() => {
    if (newCommentError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [newCommentError]);

  const handleEdit = ({ id, barter, learn, teach }) => {
    setIsEditing(true);
    setCurrentBarter(id);
    setBarterEdit(barter);
    setLearnEdit(learn);
    setTeachEdit(teach);
  };

  const handleDeleteBarter = (id) => {
    dispatch(deleteBarter(id));
  };

  const handleSubmitComment = ({ id, comment }) => {
    dispatch(addComment({ id, comment }));
    setNewComment("");
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };
  return (
    <div className="barter-card">
      {isEditing && barter.id === currentBarter ? (
        <div className="card-wrapper">
          <div className="barter-author">
            By:&nbsp;<h4>{barter.author.username}</h4>
          </div>
          <div>
            <textarea
              className="textarea"
              rows="2"
              name="comment-edit"
              defaultValue={barter.barter}
              onChange={(e) => {
                handleBarterEditChange(e);
              }}
              onBlur={(e) => handleBlur(e)}
            ></textarea>
            {barterEditDirty && !barterEdit && (
              <p className="error-message"> {barterEditError} </p>
            )}
          </div>
          <div className="barters-offer">
            <div className="learn">
              <p className="skills-tag">I want to learn</p>
              <textarea
                className="textarea"
                rows="2"
                name="learn-edit"
                defaultValue={barter.learn}
                onChange={(e) => {
                  handleLearnEditChange(e);
                }}
                onBlur={(e) => handleBlur(e)}
              ></textarea>
              {learnEditDirty && !learnEdit && (
                <p className="error-message"> {learnEditError} </p>
              )}
            </div>
            <div className="teach">
              <p className="skills-tag">I can teach</p>
              <textarea
                className="textarea"
                rows="2"
                name="teach-edit"
                defaultValue={barter.teach}
                onChange={(e) => {
                  handleTeachEditChange(e);
                }}
                onBlur={(e) => handleBlur(e)}
              ></textarea>
              {teachEditDirty && !teachEdit && (
                <p className="error-message"> {teachEditError} </p>
              )}
            </div>
            <div className="icons">
              {barter.author.username === localStorage.getItem(`username`) && (
                <MdOutlineSaveAlt
                  title="submit"
                  className="card-btns submit"
                  onClick={() => {
                    dispatch(
                      editBarter({
                        barter: barterEdit,
                        learn: learnEdit,
                        teach: teachEdit,
                        id: currentBarter,
                      })
                    );
                    setIsEditing(!isEditing);
                  }}
                />
              )}
              {barter.author.username === localStorage.getItem(`username`) && (
                <AiOutlineCloseSquare
                  title="cancel"
                  className="card-btns cancel"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(!isEditing);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="card-wrapper">
          <div className="barter-author">
            By:&nbsp;<h4>{barter.author.username}</h4>
          </div>
          <div className="card-comments">
            <p className="barter-comment">{barter.barter}</p>
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
            <div className="icons">
              {barter.author.username === localStorage.getItem(`username`) && (
                <FiEdit3
                  title="edit barter"
                  className="card-btns edit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit({
                      id: barter.id,
                      barter: barter.barter,
                      learn: barter.learn,
                      teach: barter.teach,
                    });
                  }}
                />
              )}
              {barter.author.username === localStorage.getItem(`username`) && (
                <AiOutlineCloseSquare
                  title="delete barter"
                  className="card-btns delete"
                  onClick={() => {
                    handleDeleteBarter(barter.id);
                  }}
                />
              )}
            </div>
          </div>
          <div className="comments-wrapper">
            <form className="new-comment">
              <textarea
                name="new-comment"
                value={newComment}
                className="textarea comment-input"
                placeholder="Add your comment here..."
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => {
                  handleNewCommentChange(e);
                }}
              ></textarea>
              <MdOutlineSaveAlt
                type="button"
                className="submit icons"
                title="submit comment"
                disabled={!isValid}
                onClick={() => {
                  handleSubmitComment({
                    id: barter.id,
                    comment: newComment,
                  });
                }}
              />
            </form>
            {barter.comments &&
              barter.comments.map((comment) => {
                return (
                  <div key={comment.id} className="comment">
                    <div className="comment-text">
                      <div className="comment-author">
                        By:&nbsp;<h4>{comment.author.username}</h4>
                      </div>
                      <p>{comment.comment}</p>
                    </div>
                    {currentUser.id === comment.author.id && (
                      <AiOutlineCloseSquare
                        title="delete comment"
                        className="card-btns delete icons"
                        onClick={(e) => {
                          handleDeleteComment(comment.id);
                        }}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BarterCard;