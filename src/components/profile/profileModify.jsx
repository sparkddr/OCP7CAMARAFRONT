import { useRef, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user_icon_color.png";

import colors from "../../utils/colors";

import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 470px;
  height: 470px;
  top: 50%;
  margin-top: -310px;
  right: 50%;
  margin-right: -235px;
  background-color: ${colors.secondary};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 170px;
    width: 170px;
    border-radius: 47px;
    margin-top: 20px;
  }
  form {
    margin-top: 30px;
    width: 100%;
    .label-input {
      display: flex;
      position: relative;

      .input-container {
        margin: auto;
        margin-right: 40px;
      }
      .label-container {
        margin-left: 75px;
        position: absolute;
      }
      div {
        display: flex;
        flex-direction: column;
      }
    }
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
  margin: 0 30px;
  &.annuler {
    background-color: ${colors.pink};
  }
  &.password-button {
    text-align: center;
    margin: 0 0 5px 0;
    height: 28px;
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
  const [modifyPassword, setModifyPassword] = useState(false);

  const passwordInputRef = useRef();
  const lastnameInputRef = useRef();
  const firstnameInputRef = useRef();
  const roleInputRef = useRef();

  // const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

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

    fetch(`http://localhost:8000/api/users/${authCtx.userId}`, {
      method: "PUT",
      body: JSON.stringify(sendBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        setIsModalOpen(false);
        setUserData({
          ...userData,
          firstname: enteredFirstname,
          lastname: enteredLastname,
          role: enteredRole,
        });
        alert("Vos modifications ont bien été enregistrées");
      } else {
        alert("Il y a eu une erreur");
      }
    });
  };

  return (
    <Container>
      <img src={userIcon} alt="Profil" />
      <form onSubmit={changeUser}>
        <div className="label-input">
          <div className="label-container">
            <Label>Nom :</Label>
            <Label>Prénom :</Label>
            <Label>Role :</Label>
            <Label>Mot de passe : </Label>
          </div>
          <div className="input-container">
            <Input
              ref={lastnameInputRef}
              defaultValue={userData.lastname}
            ></Input>
            <Input
              ref={firstnameInputRef}
              defaultValue={userData.firstname}
            ></Input>
            <Input ref={roleInputRef} defaultValue={userData.role}></Input>
            {modifyPassword ? (
              <Input
                type="password"
                id="new-password"
                ref={passwordInputRef}
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
    </Container>
  );
};

export default ModifyProfile;
