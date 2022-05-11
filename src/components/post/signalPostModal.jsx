import { useRef } from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

const SignalContainer = styled.div`
  background-color: ${colors.secondaryDark};

  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid black;
  label {
  }
  textarea {
    width: 80%;
    margin: 20px;
    resize: none;
  }
  button {
    all: unset;
    cursor: pointer;
    margin: 0px 20px;
    padding: 8px;
    border-radius: 15px;
    color: white;
    background-color: ${colors.primary};
    &.cancel-button {
      background-color: ${colors.pink};
    }
  }
`;

const SignalPostModal = ({ setIsSignalModalOpen, userId, postId }) => {
  const inputMessage = useRef();

  const sendSignal = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/signal/posts", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        postId: postId,
        message: inputMessage.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsSignalModalOpen(false);
        alert("Votre Signalement a bien été envoyé");
      })
      .catch((err) => {
        alert("Il y a  eu une erreur merci de réessayer");
      });
  };

  return (
    <SignalContainer>
      <h2>Créer un signalement</h2>
      <form onSubmit={sendSignal}>
        <label for="comment">
          Expliquez nous les raison qui vous ont poussées à signaler ce post
        </label>
        <textarea ref={inputMessage} id="comment" rows="5" />
        <div>
          <button className="send-button" type="submit">
            Envoyer
          </button>
          <button
            className="cancel-button"
            onClick={(e) => {
              e.preventDefault();
              setIsSignalModalOpen(false);
            }}
          >
            Annuler
          </button>
        </div>
      </form>
    </SignalContainer>
  );
};

export default SignalPostModal;
