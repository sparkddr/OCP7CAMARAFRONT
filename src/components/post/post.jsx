import { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

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
    margin: auto;
    width: 538px;
  `;

  const PostContainer = styled.div`
    background-color: ${colors.secondary};
    border-radius: 20px;
    margin-bottom: 40px;
    text-align: center;
    margin: 30px auto;
    padding: 20px;
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
