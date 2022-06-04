import { useRef, useContext, useState, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import userIcon from "../../assets/user_icon_color.png";

import DeleteAccountModal from "./deleteAccountModal";

import colors from "../../utils/colors";

import styled from "styled-components";

const Container = styled.div`
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    border-radius: 15px;
    background-color: ${colors.secondary};
    @media (min-width: 756px) {
      width: 470px;
    }
  }

  .picture-modify {
    position: absolute;
    font-size: 10px;
    width: 70px;
    text-align: center;
    right: 10%;
    top: 15%;
  }
  img {
    height: 170px;
    width: 170px;
    border-radius: 47px;
    margin-top: 20px;
    object-fit: contain;
  }
  form {
    margin-top: 30px;
    width: 100%;
    .label-input {
      display: flex;
      position: relative;

      .input-container {
        margin: auto;
        @media (min-width: 756px) {
          margin-right: 40px;
        }
      }
      .label-container {
        margin-left: 10px;
        @media (min-width: 756px) {
          margin-left: 75px;
          position: absolute;
        }
      }
      div {
        display: flex;
        flex-direction: column;
      }
    }
  }
  img:hover ~ div {
    opacity: 1;
  }

  .validation {
    margin-top: 25px;
    display: flex;
    justify-content: center;
  }
  .password-div {
    margin-top: 8px;
    display: flex;
    justify-content: center;
  }
  .delete-container {
    width: 100%;
    display: flex;
    margin: 20px 0px;
  }
`;

const ModifyPicture = styled.div`
  position: absolute;
  top: 30%;
  right: 37.5%;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  label {
    z-index: 2;
    display: inline-block;
    text-align: center;
    padding: 3px;
    border-radius: 15px;
    background-color: ${colors.secondaryDark};
  }
`;

const Button = styled.button`
  all: unset;
  height: 30px;
  padding: 3px 10px;
  border-radius: 10px;
  background-color: #3b8ea5;
  font-size: 13px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin: 0 10px;
  @media (min-width: 756px) {
    margin: 0 30px;
  }
  &.annuler {
    color: ${colors.greyCancel};
    border: 1px solid ${colors.greyCancel};
    background-color: ${colors.secondary};
    margin-bottom: 20px;
  }
  &.password-button {
    text-align: center;
    margin: 0 0 5px 0;
    height: 28px;
  }
  &#delete-account {
    margin: auto;
    background-color: ${colors.red};
  }
`;

const Input = styled.input`
  border: 1px solid white;
  border-radius: 15px;
  background-color: ${colors.secondaryDark};
  width: 200px;
  height: 30px;
  margin-bottom: 5px;
  padding-left: 12px;
  color: ${colors.grey};
  :focus {
    color: black;
  }
`;

const Label = styled.label`
  height: 30px;
  margin: auto 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const ModifyProfile = ({ setIsModalOpen, userData, setUserData }) => {
  const profilPic = userData.profilpic ? userData.profilpic : userIcon;

  const [modifyPassword, setModifyPassword] = useState(false);
  const [picture, setPicture] = useState();
  const [pictureUrl, setPictureUrl] = useState(profilPic);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const passwordInputRef = useRef();
  const lastnameInputRef = useRef();
  const firstnameInputRef = useRef();
  const roleInputRef = useRef();
  const picInputRef = useRef();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (picture === undefined) {
      return;
    } else {
      const newPictureUrl = URL.createObjectURL(picture);

      setPictureUrl(newPictureUrl);
    }
  }, [picture]);

  const changeUser = (e) => {
    e.preventDefault();

    const enteredFirstname = firstnameInputRef.current.value;
    const enteredLastname = lastnameInputRef.current.value;
    const enteredRole = roleInputRef.current.value;

    const sendBody = modifyPassword
      ? {
          firstname: enteredFirstname,
          lastname: enteredLastname,
          role: enteredRole,
          password: passwordInputRef.current.value,
        }
      : {
          firstname: enteredFirstname,
          lastname: enteredLastname,
          role: enteredRole,
        };
    const dataForm = new FormData();
    dataForm.append("user", JSON.stringify(sendBody));
    dataForm.append("picture", picture);

    fetch(`http://localhost:8000/api/users/${authCtx.userId}`, {
      method: "PUT",
      body: dataForm,
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsModalOpen(false);
        setUserData({
          ...userData,
          firstname: enteredFirstname,
          lastname: enteredLastname,
          role: enteredRole,
          profilpic: res.data.profilpic,
        });
        alert("Vos modifications ont bien été enregistrées");
      })
      .catch(() => {
        alert("Il y a eu une erreur");
      });
  };

  return (
    <Container>
      <div className="modal-content">
        <div>
          {isDeleteModalOpen && (
            <DeleteAccountModal
              userId={authCtx.userId}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
          )}
        </div>
        <div>
          <img src={pictureUrl} alt="Profil" />
          <ModifyPicture>
            <label className="label-picture" htmlFor="file">
              Modifier la photo de profil
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/png, image/jpeg, image/gif"
              onChange={(e) => setPicture(e.target.files[0])}
              ref={picInputRef}
            />
          </ModifyPicture>
        </div>
        <form onSubmit={changeUser}>
          <div className="label-input">
            <div className="label-container">
              <Label htmlFor="lastname">Nom :</Label>
              <Label htmlFor="firstname">Prénom :</Label>
              <Label htmlFor="role">Role :</Label>
              <Label htmlFor="new-password">Mot de passe : </Label>
            </div>
            <div className="input-container">
              <Input
                id="lastname"
                ref={lastnameInputRef}
                defaultValue={userData.lastname}
              ></Input>
              <Input
                id="firstname"
                ref={firstnameInputRef}
                defaultValue={userData.firstname}
              ></Input>
              <Input
                id="role"
                ref={roleInputRef}
                defaultValue={userData.role}
              ></Input>
              {modifyPassword ? (
                <Input
                  type="password"
                  id="new-password"
                  ref={passwordInputRef}
                  required
                ></Input>
              ) : (
                <Button
                  className="password-button"
                  onClick={() => {
                    setModifyPassword(true);
                  }}
                >
                  Modifier mot de passe
                </Button>
              )}
            </div>
          </div>
          <div className="delete-container">
            <Button
              id="delete-account"
              onClick={(e) => {
                e.preventDefault();
                setIsDeleteModalOpen(true);
              }}
            >
              Supprimer le compte
            </Button>
          </div>
          <div className="validation">
            <Button type="submit">Valider les modifications</Button>
            <Button
              className="annuler"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ModifyProfile;
