import { useRef, useContext } from "react";
import styled from "styled-components";
import colors from "../../utils/colors";

import AuthContext from "../../store/auth-context";

const SignalContainer = styled.div`
  background-color: ${colors.secondaryDark};
  z-index: 6;

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

const SignalCommentModal = ({ setIsSignalCommentModalOpen, commentId }) => {
  const inputMessage = useRef();
  const authCtx = useContext(AuthContext);

  const sendSignal = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/signal/comments", {
      method: "POST",
      body: JSON.stringify({
        userId: authCtx.userId,
        commentId: commentId,
        message: inputMessage.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setIsSignalCommentModalOpen(false);
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
        <label htmlFor="comment">
          Expliquez nous les raison qui vous ont poussées à signaler ce
          commentaire
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
              setIsSignalCommentModalOpen(false);
            }}
          >
            Annuler
          </button>
        </div>
      </form>
    </SignalContainer>
  );
};

export default SignalCommentModal;
