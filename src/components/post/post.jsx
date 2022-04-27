import styled from "styled-components";
import colors from "../../utils/colors";
import userIcon from "../../assets/user_icon_color.png";

import { useContext, useState } from "react";

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

const Post = ({ message, firstname, lastname, date, postId }) => {
  const authCtx = useContext(AuthContext);
  const [likeState, setLikeState] = useState(false);
  const [likeId, setLikeId] = useState();

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
        console.log(data);
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
        console.log(data);
      })
      .catch((err) => {});
  };

  return (
    <PostContainer>
      <UserDiv>
        <img src={userIcon} alt="icone utilisateur" />
        <div>
          <h2>
            {lastname} {firstname}
          </h2>
          <h3>
            Créé le {date.substr(0, 10)} à {date.substr(11, 5)}
          </h3>
        </div>
      </UserDiv>
      <p>{message}</p>
      <BottomPost>
        <div>
          {likeState ? (
            <img src={heartFull} alt="like" onClick={likeDelete} />
          ) : (
            <img src={heartEmpty} alt="like" onClick={likeHandler} />
          )}
          <p>18</p>
        </div>
        <p> 33 Commentaires</p>
      </BottomPost>
    </PostContainer>
  );
};

export default Post;
