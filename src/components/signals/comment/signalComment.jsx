import styled from "styled-components";
import ModalSeeComment from "../modalSeeComment";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";

const Signal = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 2fr 1fr;
  .tab {
    text-align: center;
  }
  .open-modal {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .icon-tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .icon-signal-comment {
    font-size: 25px;
    cursor: pointer;
    &:nth-child(1) {
      color: red;
    }
    &:nth-child(2) {
      color: green;
    }
  }
`;

const SignalComment = ({
  signalId,
  user,
  message,
  comment,
  setSignalCommentData,
  signalCommentData,
}) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const deleteSignal = () => {
    fetch(`http://localhost:8000/api/signal/comments/${signalId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setSignalCommentData(
          signalCommentData.filter((signal) => signal.id !== signalId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = () => {
    fetch(`http://localhost:8000/api/comments/${comment.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setSignalCommentData(
          signalCommentData.filter((signal) => signal.id !== signalId)
        );
      });
  };
  return (
    <Signal>
      <p className="tab"># {signalId}</p>
      <p
        className="open-modal tab"
        onClick={() => {
          setIsCommentModalOpen(true);
        }}
      >
        Voir le commentaire
      </p>
      <p className="tab">
        {user.firstname} {user.lastname}
      </p>
      <p className="tab">{message}</p>
      <div className="tab icon-tab">
        <FontAwesomeIcon
          title="Effacer le post"
          onClick={deleteComment}
          className="icon-signal-comment"
          icon={faBan}
        />
        <FontAwesomeIcon
          title="Annuler le signalement"
          onClick={deleteSignal}
          className="icon-signal-comment"
          icon={faCheck}
        />
      </div>
      {isCommentModalOpen && (
        <ModalSeeComment
          comment={comment}
          setIsCommentModalOpen={setIsCommentModalOpen}
        />
      )}
    </Signal>
  );
};

export default SignalComment;
