import { useContext, useRef } from "react";

import userIcon from "../../assets/user_icon_color.png";

import styled from "styled-components";
import colors from "../../utils/colors";
import AuthContext from "../../store/auth-context";

const Background = styled.div`
  background-color: ${colors.secondary};
  height: 400px;
  width: 400px;
  z-index: 0;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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
    height: 90px;
    border-radius: 47px;
    margin-right: 10px;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 200px;
  }
  textarea {
    width: 320px;
    padding: 20px;
    font: inherit;
    border-radius: 25px;
    background-color: ${colors.secondaryDark};
    border: none;
    margin-bottom: 10px;
    resize: none;
  }
  button {
    all: unset;
    padding: 5px 17px;
    border-radius: 10px;
    background-color: ${colors.button};
    color: white;
    font-weight: bold;
    font-size: 13px;
    cursor: pointer;
    margin-left: 20px;
    margin-right: 20px;
  }
  .annuler {
    color: ${colors.greyCancel};
    font-weight: 600;
    background-color: ${colors.secondary};
    border: 1px solid ${colors.greyCancel};
  }
`;

const ModalModifyPost = ({
  postId,
  setModifyModalPage,
  dataMessage,
  setDataMessage,
  pictureUrl,
}) => {
  const postInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const modifyPost = (e) => {
    e.preventDefault();

    const enteredMessage = postInputRef.current.value;

    fetch(`http://localhost:8000/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        message: enteredMessage,
      }),
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
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
        <img src={pictureUrl ? pictureUrl : userIcon} alt="icone utilisateur" />
        <form onSubmit={modifyPost}>
          <textarea
            rows="9"
            cols="32"
            defaultValue={dataMessage}
            ref={postInputRef}
            wrap="hard"
            required
          />
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
