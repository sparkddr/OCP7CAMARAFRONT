import Post from "../../components/post/post";
import NewPost from "../../components/post/newPost";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import AuthContext from "../../store/auth-context";

const StyledContainer = styled.div`
  margin: auto;
  width: 538px;
`;

const PostOrder = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
`;

const PostPage = () => {
  const authCtx = useContext(AuthContext);

  const [dataPosts, setDataPosts] = useState();
  const [isPostLoading, setIsPostLoading] = useState(true);

  const urlPosts = "http://localhost:8000/api/posts";

  useEffect(() => {
    const postCall = () => {
      setIsPostLoading(true);
      return fetch(urlPosts, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setDataPosts(result.data);
            setIsPostLoading(false);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    postCall();
  }, []);

  return (
    <StyledContainer>
      <NewPost
        dataPosts={dataPosts}
        setDataPosts={setDataPosts}
        isPostLoading={isPostLoading}
        setIsPostLoading={setIsPostLoading}
      />
      {isPostLoading ? (
        <div>LOADIGN</div>
      ) : (
        <PostOrder>
          {dataPosts.map((post, index) => (
            <Post
              key={`${post.index}-${index}`}
              message={post.message}
              userId={post.userId ? post.userId : 4}
              postId={post.id}
              date={post.createdAt}
              comments={post.comments && post.comments.length}
              dataPosts={dataPosts}
              setDataPosts={setDataPosts}
              isUserPost={post.userId === authCtx.userId}
              authUser={authCtx.userId}
              pictureUrl={post.pictureurl}
              post={post}
            />
          ))}
        </PostOrder>
      )}
    </StyledContainer>
  );
};

export default PostPage;
