import styled from "styled-components";
import colors from "../../utils/colors";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import React from "react";

const ModalContainer = styled.div`
  &::after {
    position: fixed;
    content: "";
    background-color: black;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0.5;
  }
`;

const Modal = styled.div`
  z-index: 3;
  background-color: ${colors.secondary};
  position: absolute;
  width: 50vw;
  transform: translate(-50%, 50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    all: unset;
    height: 30px;
    padding: 3px 10px;
    border-radius: 10px;
    background-color: #3b8ea5;
    font-size: 13px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin: 20px;
    &.cancel-button {
      background-color: ${colors.pink};
    }
  }
`;

const DeleteAccountModal = ({ userId, setIsDeleteModalOpen }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const deleteAccount = () => {
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          authCtx.logout();
          alert("Votre Compte a bien été supprimé");
          navigate("/auth");
        } else {
          alert("Il y a eu une erreur, merci de réessayer");
          throw new Error("Merci de réessayer");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ModalContainer>
      <Modal>
        <h2>Êtes vous sur de vouloir supprimer votre compte?</h2>
        <p>Toutes les données enregistrées seront perdues définitivement</p>
        <div>
          <button
            onClick={() => {
              deleteAccount();
            }}
            className="confirm-button"
          >
            Confirmer
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
          >
            Annuler
          </button>
        </div>
      </Modal>
    </ModalContainer>
  );
};

export default DeleteAccountModal;
