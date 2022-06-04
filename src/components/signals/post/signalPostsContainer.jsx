import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../../store/auth-context";

import SignalPost from "./signalPost";
import colors from "../../../utils/colors";

const PostContainer = styled.div`
  width: 70%;
  margin: 20px auto;
  background-color: ${colors.secondary};
  padding: 0.1px;

  .post-title {
    margin: 20px 0px 25px 20px;
  }
  .title {
    border-bottom: 1px solid black;
  }
`;

const PostTab = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 2fr 1fr;
  text-align: center;
  font-weight: 800;
  .item-a {
    grid-column-start: 3;
  }
  .signal-post {
  }
`;

const SignalPostsContainer = ({ isDesktop }) => {
  const authCtx = useContext(AuthContext);
  const [signalPostData, setSignalPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8000/api/signal/posts", {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSignalPostData(data.data);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PostContainer>
      <div className="title">
        <h2 className="post-title">
          POSTS {signalPostData.length > 0 && ` (${signalPostData.length})`}
        </h2>
      </div>
      {isDesktop && (
        <PostTab>
          <p className="item-a">Signalé par</p>
          <p className="item-b">Commentaire</p>
          <p className="item-c">Action</p>
        </PostTab>
      )}

      {!isLoading &&
        signalPostData.map((signal, index) => {
          return (
            <SignalPost
              className="signal-post"
              key={`${signal.index}-${index}`}
              signalId={signal.id}
              user={signal.user ? signal.user : ""}
              message={signal.message}
              post={signal.post}
              setSignalPostData={setSignalPostData}
              signalPostData={signalPostData}
              isDesktop={isDesktop}
            />
          );
        })}
    </PostContainer>
  );
};
export default SignalPostsContainer;
