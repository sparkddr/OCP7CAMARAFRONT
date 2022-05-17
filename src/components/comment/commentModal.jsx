import { useContext } from "react";
import styled from "styled-components";
import AuthContext from "../../store/auth-context";

const Modale = styled.div`
  position: absolute;
  height: 33px;
  width: 90px;
  left: 67%;
  top: 5px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .modale {
    margin: 0 8px;
    padding: 0px;
    line-height: 20px;
    font-size: 12px;
    cursor: pointer;
  }
`;

const CommentModal = ({
  commentId,
  dataComment,
  setDataComment,
  setIsModalOpen,
  commentNumber,
  setCommentNumber,
  authUser,
  setIsSignalCommentModalOpen,
}) => {
  const authCtx = useContext(AuthContext);
  const deleteComment = () => {
    console.log(dataComment);
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: "DELETE",
      Authorization: `Bearer ${authCtx.token}`,
    })
      .then((res) => res.json())
      .then(() => {
        setIsModalOpen(false);
        setCommentNumber(commentNumber - 1);
        setDataComment(
          dataComment.filter((comment) => comment.id !== commentId)
        );
      });
  };

  return (
    <Modale>
      {authUser || authCtx.admin ? (
        <p onClick={deleteComment} className="modale">
          Supprimer
        </p>
      ) : (
        <p
          onClick={() => {
            setIsSignalCommentModalOpen(true);
            setIsModalOpen(false);
          }}
          className="modale"
        >
          Signaler
        </p>
      )}
    </Modale>
  );
};

export default CommentModal;
