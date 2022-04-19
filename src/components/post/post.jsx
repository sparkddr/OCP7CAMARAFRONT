import { useState, useEffect } from "react";
import styled from "styled-components";

function Post() {
  const [data, setData] = useState([]);
  const url = "http://localhost:8000/api/posts";

  useEffect(() => {
    fetch(url)
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

  const StyledContainer = styled.div`
    width: 60%;
    margin: auto;
  `;

  const PostContainer = styled.div`
    background-color: #E1D89F;
    border-radius: 20px;
    width 50%;
    text-align : center;
    margin: 30px auto;
    padding : 20px;
    height: 200px;
  `;

  return (
    <StyledContainer>
      {data.map((post, index) => (
        <PostContainer key={`${post.index}-${index}`}>
          {post.message}
        </PostContainer>
      ))}
    </StyledContainer>
  );
}

export default Post;
