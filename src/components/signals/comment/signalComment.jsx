import styled from "styled-components";
import ModalSeeComment from "../modalSeeComment";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../../store/auth-context";

import colors from "../../../utils/colors";

const Signal = styled.div`
line-height: 10px;
width 90%;
margin : 20px auto;
@media (min-width: 756px) {
  width : 100%;
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 2fr 1fr;
}

.category-name {
  font-weight: 700;
}
.tab {
  &.index{
    font-weight : 600;
  }
  @media (min-width: 756px) {
    text-align: center;
  }
}
  .open-modal {
    cursor: pointer;
    color : ${colors.primary};
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
  isDesktop,
}) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const deleteSignal = () => {
    fetch(`http://localhost:8000/api/signal/comments/${signalId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
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
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSignalCommentData(
          signalCommentData.filter(
            (signal) => signal.commentId !== data.data.id
          )
        );
      });
  };
  return (
    <Signal>
      <p className="tab index"># {signalId}</p>
      <p
        className="open-modal tab"
        onClick={() => {
          setIsCommentModalOpen(true);
        }}
      >
        Voir le commentaire
      </p>
      {!isDesktop && <p className="category-name">Signalé par :</p>}
      <p className="tab">
        {user.firstname} {user.lastname}
      </p>
      {!isDesktop && <p className="category-name">Commentaire :</p>}
      <p className="tab">{message}</p>
      {!isDesktop && <p className="category-name">Actions :</p>}
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
