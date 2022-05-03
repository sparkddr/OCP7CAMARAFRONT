import { useRef } from "react";

import userIcon from "../../assets/user_icon_color.png";

import styled from "styled-components";
import colors from "../../utils/colors";

const Background = styled.div`
  background-color: ${colors.secondary};
  height: 400px;
  width: 400px;
  z-index: 0;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
`;
const Modal = styled.div`
  ::after {
    position: absolute;
    content: "";
    background-color: black;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    opacity: 0.5;
  }
  position: fixed;

  z-index: 5;

  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  img {
    height: 61px;
    border-radius: 47px;
    margin-right: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 200px;
  }
  input {
    width: 320px;
    height: 40px;
    border-radius: 47px;
    background-color: ${colors.secondaryDark};
    padding-left: 20px;
    border: none;
  }
  button {
    all: unset;
    padding: 5px 8px;
    border-radius: 10px;
    background-color: #3b8ea5;
    color: white;
    font-weight: bold;
    font-size: 13px;
    cursor: pointer;
    margin-left: 20px;
    margin-right: 20px;
  }
  .annuler {
    background-color: red;
  }
`;

const ModalModifyPost = ({
  postId,
  setModifyModalPage,
  dataMessage,
  setDataMessage,
}) => {
  const postInputRef = useRef();

  const modifyPost = (e) => {
    e.preventDefault();

    const enteredMessage = postInputRef.current.value;

    fetch(`http://localhost:8000/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        message: enteredMessage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setModifyModalPage(false);
        setDataMessage(enteredMessage);
      }
    });
  };

  return (
    <Modal>
      <Background>
        <img src={userIcon} alt="icone utilisateur" />
        <form onSubmit={modifyPost}>
          <input type="text" defaultValue={dataMessage} ref={postInputRef} />
          <div className="buttons">
            <button type="submit"> Envoyer</button>
            <button
              onClick={() => {
                setModifyModalPage(false);
              }}
              className="annuler"
            >
              Annuler
            </button>
          </div>
        </form>
      </Background>
    </Modal>
  );
};

export default ModalModifyPost;
