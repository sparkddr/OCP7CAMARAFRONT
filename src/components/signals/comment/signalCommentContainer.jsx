import { useEffect, useState } from "react";
import styled from "styled-components";

import SignalComment from "./signalComment";
import colors from "../../../utils/colors";

const CommentContainer = styled.div`
  width: 70%;
  margin: 20px auto;
  background-color: ${colors.secondary};
  padding: 0.1px;

  h2 {
    margin: 20px 0px 25px 20px;
  }
  .title {
    border-bottom: 1px solid black;
  }
`;

const CommentTab = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 2fr 1fr;
  text-align: center;
  font-weight: 700;
  .item-a {
    grid-column-start: 3;
  }
`;

const SignalCommentsContainer = () => {
  const [signalCommentData, setSignalCommentData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8000/api/signal/comments")
      .then((res) => res.json())
      .then((data) => {
        setSignalCommentData(data.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <CommentContainer>
      <div className="title">
        <h2>COMMENTAIRES</h2>
      </div>
      <CommentTab>
        <p className="item-a">Signalé par</p>
        <p className="item-b">Commentaire</p>
        <p className="item-c">Action</p>
      </CommentTab>
      {!isLoading &&
        signalCommentData.map((signal, index) => {
          return (
            <SignalComment
              key={`${signal.index}-${index}`}
              signalId={signal.id}
              user={signal.user ? signal.user : ""}
              message={signal.message}
              comment={signal.comment}
              setSignalCommentData={setSignalCommentData}
              signalCommentData={signalCommentData}
            />
          );
        })}
    </CommentContainer>
  );
};
export default SignalCommentsContainer;
