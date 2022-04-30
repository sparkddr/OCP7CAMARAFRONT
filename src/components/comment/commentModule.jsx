import { useState, useEffect } from "react";

import styled from "styled-components";

import colors from "../../utils/colors";

import Comment from "./comment";
import NewComment from "./newComment";

const CommentContainer = styled.div`
  border-top: 1px solid ${colors.grey};
  padding-top: 17px;
  padding-bottom: 15px;
`;

function CommentModule({ postId, commentNumber, setCommentNumber }) {
  const url = `http://localhost:8000/api/comments?postId=${postId}`;
  const [dataComment, setDataComment] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setDataComment(result.data);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

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
            commentsNumber={comment.length}
          />
        ))
      )}

      <NewComment
        postId={postId}
        commentNumber={commentNumber}
        setCommentNumber={setCommentNumber}
        dataComment={dataComment}
        setDataComment={setDataComment}
      />
    </CommentContainer>
  );
}

export default CommentModule;
