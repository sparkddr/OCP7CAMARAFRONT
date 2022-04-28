import styled from "styled-components";
import colors from "../../utils/colors";
import userIcon from "../../assets/user_icon_color.png";

import { useContext, useState, useEffect } from "react";

import heartEmpty from "../../assets/icons/heart-regular.svg";
import heartFull from "../../assets/icons/heart-solid.svg";
import AuthContext from "../../store/auth-context";

const PostContainer = styled.div`
  background-color: ${colors.secondary};
  border-radius: 20px;
  margin-bottom: 40px;
  margin: 30px auto;
  padding: 13px 20px 0px 20px;
`;

const UserDiv = styled.div`
  display: flex;
  h2 {
    font-size: 12px;
    margin-bottom: -11px;
  }
  h3 {
    font-size: 10px;
    text-align: right;
    font-weight: 400;
  }
  img {
    height: 61px;
    border-radius: 47px;
    margin-right: 10px;
  }
`;

const BottomPost = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    img {
      cursor: pointer;
    }
    p {
      margin-left: 10px;
    }
  }
`;

const Post = ({ message, date, postId, userId }) => {
  const authCtx = useContext(AuthContext);

  const [likeState, setLikeState] = useState(false);
  const [likeId, setLikeId] = useState();
  const [likeNum, setLikeNum] = useState();

  const [dataUser, setDataUser] = useState([]);
  const [isUserLoading, setUserLoading] = useState(true);

  const urlUser = `http://localhost:8000/api/users/${userId}`;
  const urlLikes = `http://localhost:8000/api/likes/post/${postId}`;

  const likeHandler = () => {
    fetch("http://localhost:8000/api/likes", {
      method: "POST",
      body: JSON.stringify({
        userId: authCtx.userId,
        postId: postId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "L'envoi du like a échoué";
            if (data && data.message) {
              errorMessage = data.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setLikeState(true);
        setLikeId(data.data.id);
      })
      .catch((err) => {});
  };
  const likeDelete = () => {
    fetch(`http://localhost:8000/api/likes/${likeId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "L'envoi du like a échoué";
            if (data && data.message) {
              errorMessage = data.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setLikeState(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const getUsers = () => {
      fetch(urlUser, {
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

  useEffect(() => {
    const getLikes = () => {
      fetch(urlLikes, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setLikeNum(result.data.length);
            const like = result.data.find(
              (like) => like.userId === authCtx.userId
            );
            console.log(like);
            if (like) {
              setLikeState(true);
              setLikeId(like.id);
            } else {
              setLikeState(false);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getLikes();
  });

  return (
    <PostContainer>
      {isUserLoading ? (
        <div></div>
      ) : (
        <UserDiv>
          <img src={userIcon} alt="icone utilisateur" />
          <div>
            <h2>
              {dataUser.lastname} {dataUser.firstname}
            </h2>
            <h3>
              Créé le {date.substr(0, 10)} à {date.substr(11, 5)}
            </h3>
          </div>
        </UserDiv>
      )}
      <p>{message}</p>
      <BottomPost>
        <div>
          {likeState ? (
            <img src={heartFull} alt="like" onClick={likeDelete} />
          ) : (
            <img src={heartEmpty} alt="like" onClick={likeHandler} />
          )}
          <p>{likeNum}</p>
        </div>
        <p> 33 Commentaires</p>
      </BottomPost>
    </PostContainer>
  );
};

export default Post;
