import Post from "../../components/post/post";
import NewPost from "../../components/post/newPost";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import AuthContext from "../../store/auth-context";

const StyledContainer = styled.div`
  margin: auto;
  width: 538px;
`;

const PostPage = () => {
  const authCtx = useContext(AuthContext);

  const [dataPost, setDataPost] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(true);

  const urlPosts = "http://localhost:8000/api/posts";

  useEffect(() => {
    const postCall = () => {
      return fetch(urlPosts, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setDataPost(result.data);
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
      <NewPost />
      {isPostLoading ? (
        <div>Load</div>
      ) : (
        dataPost.map((post, index) => (
          <Post
            key={`${post.index}-${index}`}
            message={post.message}
            userId={post.userId ? post.userId : 4}
            postId={post.id}
            date={post.createdAt}
          />
        ))
      )}
    </StyledContainer>
  );
};

export default PostPage;
