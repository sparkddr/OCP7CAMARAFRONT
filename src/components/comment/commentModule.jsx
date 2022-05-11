import styled from "styled-components";

import colors from "../../utils/colors";

import Comment from "./comment";
import NewComment from "./newComment";

const CommentContainer = styled.div`
  border-top: 1px solid ${colors.grey};
  padding-top: 17px;
  padding-bottom: 15px;
`;

function CommentModule({
  postId,
  commentNumber,
  setCommentNumber,
  dataComment,
  setDataComment,
  isLoading,
  authUser,
  profilpic,
}) {
  return (
    <CommentContainer>
      {isLoading ? (
        <div></div>
      ) : (
        dataComment.map((comment, index) => (
          <Comment
            key={`${comment.index}-${index}`}
            message={comment.message}
            user={comment.userId ? comment.userId : 2}
            commentId={comment.id}
            dataComment={dataComment}
            setDataComment={setDataComment}
            commentNumber={commentNumber}
            setCommentNumber={setCommentNumber}
            authUser={authUser === comment.userId}
          />
        ))
      )}

      <NewComment
        postId={postId}
        commentNumber={commentNumber}
        setCommentNumber={setCommentNumber}
        dataComment={dataComment}
        setDataComment={setDataComment}
        profilpic={profilpic}
      />
    </CommentContainer>
  );
}

export default CommentModule;
