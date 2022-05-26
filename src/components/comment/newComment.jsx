import { useContext, useEffect, useRef, useState } from "react";
import userIcon from "../../assets/user_icon_color.png";
import styled from "styled-components";

import AuthContext from "../../store/auth-context";

import colors from "../../utils/colors";

const NComment = styled.div`
  display: flex;
  align-items: center;
  form {
    width: 90%;
    display: flex;
    align-items: center;
  }

  img {
    width: 43px;
    height: 43px;
    border-radius: 29px;
    object-fit: contain;
  }
  textarea {
    width: 70%;
    resize: none;
    height: 20px;
    font: inherit;
    font-size: 12px;
    border-radius: 14px;
    margin-left: 17px;
    background-color: ${colors.secondaryDark};
    padding: 10px 10px;
    border: none;
    @media (min-width: 756px) {
      width: 320px;
      height: 20px;
      padding-left: 20px;
    }
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
    fetch(`http://localhost:8000/api/users/${authCtx.userId}`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
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
        Authorization: `Bearer ${authCtx.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("merci de réessayer");
        }
      })
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
        <textarea
          row="1"
          type="text"
          required
          minLength="1"
          ref={commentInputRef}
        />
        <button type="submit"> Envoyer</button>
      </form>
    </NComment>
  );
};

export default NewComment;
