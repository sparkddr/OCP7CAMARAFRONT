import { useRef } from "react";
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

const NewPost = () => {
  const postInputRef = useRef();

  const sendPost = (event) => {
    const enteredPost = postInputRef.current.value;

    event.preventDefault();
    fetch("http://localhost:8000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
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
        console.log(data);
      })
      .catch((err) => {});
  };
  return (
    <Container>
      <img src={userIcon} alt="icone utilisateur" />
      <form onSubmit={sendPost}>
        <input type="text" defaultValue="What's up Name?" ref={postInputRef} />
        <button type="submit"> Envoyer</button>
      </form>
    </Container>
  );
};

export default NewPost;
