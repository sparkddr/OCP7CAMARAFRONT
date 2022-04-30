import { useRef, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

import styled from "styled-components";
import colors from "../../utils/colors";
import userIcon from "../../assets/user_icon_color.png";

const Container = styled.div`
  background-color: ${colors.secondary};
  border-radius: 20px;
  margin-bottom: 40px;
  margin: 30px auto;
  height: 80px;
  padding: 15px;
  display: flex;
  align-items: center;
  img {
    height: 61px;
    border-radius: 47px;
    margin-right: 10px;
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

const NewPost = ({ dataPost, setDataPost }) => {
  const postInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [dataUser, setDataUser] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${authCtx.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setDataUser(data.data);
        setIsDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendPost = (event) => {
    const enteredPost = postInputRef.current.value;

    event.preventDefault();
    fetch("http://localhost:8000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        userId: authCtx.userId,
        message: enteredPost,
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
            let errorMessage = "L'envoi a échoué";
            if (data && data.message) {
              errorMessage = data.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setDataPost([data.data, ...dataPost]);
        console.log(dataPost);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return isDataLoading ? (
    <div></div>
  ) : (
    <Container>
      <img src={userIcon} alt="icone utilisateur" />
      <form onSubmit={sendPost}>
        <input
          type="text"
          defaultValue={"What's up " + dataUser.firstname + "?"}
          ref={postInputRef}
        />
        <button type="submit"> Envoyer</button>
      </form>
    </Container>
  );
};

export default NewPost;
