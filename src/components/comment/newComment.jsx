import { useContext, useEffect, useRef, useState } from "react";
import userIcon from "../../assets/user_icon_color.png";
import styled from "styled-components";

import AuthContext from "../../store/auth-context";

import colors from "../../utils/colors";

const NComment = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 43px;
    height: 43px;
    border-radius: 29px;
    object-fit: contain;
  }
  input {
    width: 320px;
    height: 40px;
    border-radius: 47px;
    margin-left: 17px;
    background-color: ${colors.secondaryDark};
    padding-left: 20px;
    border: none;
  }
  button {
    margin-left: 5px;
    all: unset;
    margin-left: 5px;
    padding: 5px 8px;
    border-radius: 10px;
    background-color: #3b8ea5;
    color: white;
    font-weight: bold;
    font-size: 13px;
    cursor: pointer;
  }
`;

const NewComment = ({
  postId,
  setCommentNumber,
  commentNumber,
  dataComment,
  setDataComment,
}) => {
  const authCtx = useContext(AuthContext);
  const commentInputRef = useRef();
  const [profilpic, setProfilPic] = useState(userIcon);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${authCtx.userId}`)
      .then((res) => res.json())
      .then((res) => {
        setProfilPic(res.data.profilpic);
      })
      .catch((err) => {
        alert(err);
      });
  });

  const sendComment = (event) => {
    const url = "http://localhost:8000/api/comments";
    const enteredComment = commentInputRef.current.value;

    event.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userId: authCtx.userId,
        postId: postId,
        message: enteredComment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCommentNumber(commentNumber + 1);
        setDataComment([...dataComment, data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    event.target.reset();
  };

  return (
    <NComment>
      <img src={profilpic} alt="icone utilisateur" />
      <form onSubmit={sendComment}>
        <input type="text" ref={commentInputRef} />
        <button type="submit"> Envoyer</button>
      </form>
    </NComment>
  );
};

export default NewComment;
