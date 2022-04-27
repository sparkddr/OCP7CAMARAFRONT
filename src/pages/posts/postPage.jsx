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
  const [dataUser, setDataUser] = useState([]);

  const [isUserLoading, setUserLoading] = useState(true);

  const urlPosts = "http://localhost:8000/api/posts";
  const urlUsers = "http://localhost:8000/api/users";

  useEffect(() => {
    fetch(urlPosts)
      .then((res) => res.json())
      .then(
        (result) => {
          setDataPost(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    const getUsers = () => {
      fetch(urlUsers, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setDataUser(result.data);
            setUserLoading(false);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getUsers();
  }, []);

  const userProp = (id) => {
    let filterUser = dataUser.filter((user) => user.id === id);
    return filterUser;
  };

  return (
    <StyledContainer>
      <NewPost />
      {isUserLoading ? (
        <div></div>
      ) : (
        dataPost.map((post, index) => (
          <Post
            key={`${post.index}-${index}`}
            message={post.message}
            firstname={userProp(post.userId ? post.userId : 3)[0].firstname}
            lastname={userProp(post.userId ? post.userId : 3)[0].lastname}
            postId={post.id}
            date={post.createdAt}
          />
        ))
      )}
    </StyledContainer>
  );
};

export default PostPage;
