import Post from "../../components/post/post";
import NewPost from "../../components/post/newPost";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  margin: auto;
  width: 90%;
  display: flex;
  padding: 1px;
  flex-direction: column;
  @media (min-width: 756px) {
    width: 538px;
  }
`;

const PostOrder = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
`;

const PostPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [dataPosts, setDataPosts] = useState();
  const [isPostLoading, setIsPostLoading] = useState(true);

  const urlPosts = "http://localhost:8000/api/posts";

  useEffect(() => {
    const postCall = () => {
      fetch(urlPosts, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            navigate("/auth");
            throw new Error(
              "Le chargement a échoué, merci de vous reconnecter"
            );
          }
        })

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
    if (authCtx.isLoggedIn) {
      postCall();
    } else {
      navigate("/auth");
    }
    // authCtx.isLoggedIn ? postCall() : navigate("/auth");
  }, []);

  return (
    <StyledContainer>
      {!isPostLoading && (
        <NewPost
          dataPosts={dataPosts}
          setDataPosts={setDataPosts}
          isPostLoading={isPostLoading}
          setIsPostLoading={setIsPostLoading}
        />
      )}
      {isPostLoading ? (
        <div>LOADING</div>
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
