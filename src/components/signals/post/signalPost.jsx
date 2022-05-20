import styled from "styled-components";
import ModalSeePost from "../modalSeePost";
import AuthContext from "../../../store/auth-context";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
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
    @media (min-width: 756px) {
      text-align: center;
    }
  }
  .tab.index {
    font-weight: 600;
  }
  .open-modal {
    cursor: pointer;
    color: ${colors.primary};
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
  isDesktop,
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
          signalPostData.filter((signal) => signal.postId !== data.data.id)
        );
      });
  };
  return (
    <Signal>
      <p className="tab index"># {signalId}</p>
      <p
        className="open-modal tab"
        onClick={() => {
          setIsPostModalOpen(true);
        }}
      >
        Voir le post
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
