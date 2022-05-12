import { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../store/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import colors from "../../utils/colors";

import Comment from "../comment/comment";

const ModalContainer = styled.div`
  .post-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    padding: 45px 0px 0px 0px;
    width: 538px;
    background-color: ${colors.secondary};
    border-radius: 8px;
    padding: 15px;
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

const ModalSeeComment = ({ comment, setIsCommentModalOpen }) => {
  const [dataComment, setDataComment] = useState();
  const [commentNumber, setCommentNumber] = useState();

  const authCtx = useContext(AuthContext);

  return (
    <ModalContainer>
      <div className="post-modal">
        <FontAwesomeIcon
          onClick={() => {
            setIsCommentModalOpen(false);
          }}
          className="icon-cross"
          icon={faXmark}
        />
        <Comment
          message={comment.message}
          user={comment.userId}
          commentId={comment.id}
          dataComment={dataComment}
          setDataComment={setDataComment}
          commentNumber={commentNumber}
          setCommentNumber={setCommentNumber}
          authUser={authCtx.userId}
        ></Comment>
      </div>
    </ModalContainer>
  );
};

export default ModalSeeComment;
