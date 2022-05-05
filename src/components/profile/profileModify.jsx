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
    margin-top: 50px;
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

const ModifyProfile = ({ setIsModalOpen, user }) => {
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
            {modifyPassword && <Label>Mot de passe : </Label>}
          </div>
          <div className="input-container">
            <Input ref={lastnameInputRef} defaultValue={user.lastname}></Input>
            <Input
              ref={firstnameInputRef}
              defaultValue={user.firstname}
            ></Input>
            <Input ref={roleInputRef} defaultValue={user.role}></Input>
            {modifyPassword && (
              <Input
                type="password"
                id="new-password"
                ref={passwordInputRef}
              ></Input>
            )}
          </div>
        </div>

        {modifyPassword ? (
          <div></div>
        ) : (
          <button
            onClick={() => {
              setModifyPassword(true);
            }}
          >
            Modifier password
          </button>
        )}

        <div>
          <button type="submit">Valider les modifications</button>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Annuler
          </button>
        </div>
      </form>
    </Container>
  );
};

export default ModifyProfile;
