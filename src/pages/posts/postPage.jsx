import Post from "../../components/post/post";
import NewPost from "../../components/post/newPost";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: auto;
  width: 538px;
`;

const PostPage = () => {
  const [data, setData] = useState([]);
  const urlPosts = "http://localhost:8000/api/posts";

  useEffect(() => {
    fetch(urlPosts)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  return (
    <StyledContainer>
      <NewPost />
      {data.map((post, index) => (
        <Post key={`${post.index}-${index}`} message={post.message} />
      ))}
    </StyledContainer>
  );
};

export default PostPage;
