import { useEffect, useState, useContext } from "react";

import ModifyProfile from "../components/profile/profileModify";
import ProfilHeader from "../components/profile/profileHeader";
import Post from "../components/post/post";

import styled from "styled-components";

import AuthContext from "../store/auth-context";

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

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [postData, setPostData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts?userid=${authCtx.userId}`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPostData(data.data);
        setIsPostLoading(false);
        console.log(postData);
        console.log(isPostLoading);
      });
  }, []);

  return isDataLoading ? (
    <div></div>
  ) : (
    <div>
      <ProfilHeader userData={userData} setUserData={setUserData} />
      {!isPostLoading && (
        <StyledContainer>
          {postData.map((post, index) => {
            return (
              <Post
                key={`${post.index}-${index}`}
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
