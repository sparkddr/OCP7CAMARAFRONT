import styled from "styled-components";
import ModalSeePost from "../modalSeePost";
import AuthContext from "../../../store/auth-context";
import { useContext, useState } from "react";
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
  .icon-signal-post {
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

const SignalPost = ({
  signalId,
  user,
  message,
  post,
  setSignalPostData,
  signalPostData,
}) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const deleteSignal = () => {
    fetch(`http://localhost:8000/api/signal/posts/${signalId}`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setSignalPostData(
          signalPostData.filter((signal) => signal.id !== signalId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePost = () => {
    fetch(`http://localhost:8000/api/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSignalPostData(
          signalPostData.filter((signal) => signal.id !== signalId)
        );
      });
  };
  return (
    <Signal>
      <p className="tab"># {signalId}</p>
      <p
        className="open-modal tab"
        onClick={() => {
          setIsPostModalOpen(true);
        }}
      >
        Voir le post
      </p>
      <p className="tab">
        {user.firstname} {user.lastname}
      </p>
      <p className="tab">{message}</p>
      <div className="tab icon-tab">
        <FontAwesomeIcon
          title="Effacer le post"
          onClick={deletePost}
          className="icon-signal-post"
          icon={faBan}
        />
        <FontAwesomeIcon
          title="Annuler le signalement"
          onClick={deleteSignal}
          className="icon-signal-post"
          icon={faCheck}
        />
      </div>
      {isPostModalOpen && (
        <ModalSeePost post={post} setIsPostModalOpen={setIsPostModalOpen} />
      )}
    </Signal>
  );
};

export default SignalPost;
