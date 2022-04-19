import styled from "styled-components";
import { useState, useRef } from "react";

const AuthContainer = styled.div`
  width: 330px;
  background-color: #2d728f;
  border-radius: 20px;
  margin: auto;
  padding: 30px;
  text-align: center;
  color: white;
  font-family: "Open Sans";
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  & label {
    margin-bottom: 10px;
  }
  & input {
    border: 1px solid white;
    border-radius: 3px;
    width: 70%;
    height: 20px;
  }
`;

const Submit = styled.button`
  all: unset;
  width: 150px;
  height: 30px;
  border-radius: 10px;
  background-color: #3b8ea5;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const SwitchMod = styled.p`
  text-decoration: underline;
  cursor: pointer;
`;

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const lastNameInputRef = useRef();
  const firstNameInputRef = useRef();
  const roleInputRef = useRef();

  const [haveAccount, setHaveAccount] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredRole = roleInputRef.current.value;

    //ADD VALIDATION

    if (haveAccount) {
    } else {
      fetch("http://localhost:8000/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          firstname: enteredFirstName,
          lastname: enteredLastName,
          role: enteredRole,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
        } else {
          return res.json().then((data) => {
            console.log(data);
          });
        }
      });
    }
  };

  function switchAuthMod() {
    setHaveAccount((haveAccount) => !haveAccount);
  }

  return (
    <AuthContainer>
      <h1>{haveAccount ? "Se connecter" : "Nouveau Compte"}</h1>
      <form onSubmit={submitHandler}>
        <InputDiv>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </InputDiv>
        {!haveAccount && (
          <InputDiv>
            <label>Nom</label>
            <input ref={lastNameInputRef} />
          </InputDiv>
        )}
        {!haveAccount && (
          <InputDiv>
            <label>Prénom</label>
            <input ref={firstNameInputRef} />
          </InputDiv>
        )}
        {!haveAccount && (
          <InputDiv>
            <label>Role</label>
            <input ref={roleInputRef} />
          </InputDiv>
        )}
        <InputDiv>
          <label>Mot de passe</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </InputDiv>
        <Submit>{haveAccount ? "Connexion" : "S'enregistrer"} </Submit>
      </form>
      <SwitchMod onClick={switchAuthMod}>
        {haveAccount
          ? "Vous n'avez pas de compte?"
          : "Vous avez déja un compte?"}
      </SwitchMod>
    </AuthContainer>
  );
};

export default AuthForm;
