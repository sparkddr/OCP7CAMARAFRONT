import { useState, useEffect } from "react";
import styled from "styled-components";

function Post() {
  const [data, setData] = useState([]);
  const url = "http://localhost:8000/api/comment";

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

  return <div></div>;
}

export default Post;
