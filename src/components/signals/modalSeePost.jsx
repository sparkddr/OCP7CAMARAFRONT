import { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../store/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import colors from "../../utils/colors";

import Post from "../post/post";

const ModalContainer = styled.div`
  .post-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    padding: 45px 0px 0px 0px;
    width: 538px;
    background-color: ${colors.secondaryDark};
    border-radius: 8px;
  }
  .icon-cross {
    font-size: 30px;
    position: absolute;
    right: 17px;
    top: 8px;
    cursor: pointer;
  }
  &::before {
    content: "";
    position: absolute;
    background-color: black;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    opacity: 0.3;
    z-index: 0;
  }
  .post-signal {
    margin: 0px;
  }
`;

const ModalSeePost = ({ post, setIsPostModalOpen }) => {
  const [dataPost, setDataPosts] = useState([]);
  const authCtx = useContext(AuthContext);

  return (
    <ModalContainer>
      <div className="post-modal">
        <FontAwesomeIcon
          onClick={() => {
            setIsPostModalOpen(false);
          }}
          className="icon-cross"
          icon={faXmark}
        />
        <Post
          className="post-signal"
          message={post.message}
          date={post.createdAt}
          userId={post.userId ? post.userId : 4}
          postId={post.id}
          pictureUrl={post.pictureurl ? post.pictureurl : ""}
          dataPost={dataPost}
          setDataPost={setDataPosts}
          authUser={authCtx.userId}
        />
      </div>
    </ModalContainer>
  );
};

export default ModalSeePost;
