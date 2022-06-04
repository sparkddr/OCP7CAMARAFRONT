import { useEffect, useState, useContext } from "react";
import Loader from "../components/utils/loader";
import { useNavigate } from "react-router-dom";

import ProfilHeader from "../components/profile/profileHeader";
import Post from "../components/post/post";

import styled from "styled-components";

import AuthContext from "../store/auth-context";

const StyledContainer = styled.div`
  margin: auto;
  width: 90%;
  display: flex;
  padding: 1px;
  flex-direction: column-reverse;

  @media (min-width: 756px) {
    width: 538px;
  }
`;

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [postData, setPostData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userCall = () => {
      fetch(`http://localhost:8000/api/users/${authCtx.userId}`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.data);
          setIsDataLoading(false);
        });
    };
    if (authCtx.isLoggedIn) {
      userCall();
    } else {
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts?userid=${authCtx.userId}`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPostData(data.data);
        setIsPostLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isDataLoading ? (
    <Loader />
  ) : (
    <div>
      <ProfilHeader userData={userData} setUserData={setUserData} />
      {!isPostLoading && (
        <StyledContainer>
          {postData.map((post, index) => {
            return (
              <Post
                key={`${post.id}-${index}`}
                message={post.message}
                userId={post.userId ? post.userId : 4}
                postId={post.id}
                date={post.createdAt}
                comments={post.comments && post.comments.length}
                dataPosts={postData}
                setDataPosts={setPostData}
                isUserPost={post.userId === authCtx.userId}
                authUser={authCtx.userId}
                pictureUrl={post.pictureurl}
                post={post}
              ></Post>
            );
          })}
        </StyledContainer>
      )}
    </div>
  );
};

export default ProfilePage;
