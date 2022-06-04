import { useContext } from "react";

import styled from "styled-components";
import colors from "../../utils/colors";
import AuthContext from "../../store/auth-context";

const Modal = styled.div`
  position: absolute;
  background-color: ${colors.secondaryDark};
  padding: 5px;
  margin: 0;
  font-size: 12px;
  line-height: 7px;
  top: 29px;
  right: 17px;
  border-radius: 9px;
  border: 0.5px solid black;
  p {
    cursor: pointer;
  }
`;

const ModifyPost = ({
  isUserPost,
  postId,
  setDataPosts,
  dataPosts,
  setModifyModalPage,
  setIsSignalModalOpen,
  isSignalModalOpen,
  setModifyModal,
}) => {
  const authCtx = useContext(AuthContext);
  const deletePost = () => {
    fetch(`http://localhost:8000/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newDataPost = dataPosts.filter((post) => post.id !== postId);
        setDataPosts(newDataPost);
        setModifyModal(false);
      });
  };

  const modifyHandler = (e) => {
    e.preventDefault();
    setModifyModalPage(true);
    setModifyModal(false);
  };

  return (
    <Modal postId={postId}>
      {isUserPost || authCtx.admin ? (
        <div>
          <p onClick={modifyHandler}>Modifier Post</p>
          <p onClick={deletePost}>Supprimer Post</p>
        </div>
      ) : (
        <p
          onClick={() => {
            setIsSignalModalOpen(true);
            setModifyModal(false);
          }}
        >
          Signaler Post
        </p>
      )}
    </Modal>
  );
};

export default ModifyPost;
