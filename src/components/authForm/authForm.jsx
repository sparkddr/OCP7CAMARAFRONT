import styled from "styled-components";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import colors from "../../utils/colors";

const AuthContainer = styled.div`
  width: 90%;
  background-color: #2d728f;
  border-radius: 20px;
  margin: 30px auto 0px auto;
  padding: 10px;

  text-align: center;
  color: white;
  font-family: "Open Sans";
  @media (min-width: 756px) {
    width: 330px;
    padding: 30px;
  }
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
    border-radius: 14px;
    width: 70%;
    height: 20px;
  }
`;

const Submit = styled.button`
  all: unset;
  width: 150px;
  height: 30px;
  border-radius: 10px;
  background-color: ${colors.primary};
  filter: saturate(120%);
  box-shadow: rgb(0 0 0 / 25%) 0px 1px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const SwitchMod = styled.p`
  text-decoration: underline;
  cursor: pointer;
`;

const AuthForm = () => {
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const lastNameInputRef = useRef();
  const firstNameInputRef = useRef();
  const roleInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [haveAccount, setHaveAccount] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //ADD VALIDATION
    setIsLoading(true);
    const loginUser = () => {
      fetch("http://localhost:8000/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "L'authentification a échouée";
              if (data && data.message) {
                errorMessage = data.message;
              }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          authCtx.login(data.token, data.data.id, data.data.admin);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    };
    if (haveAccount) {
      loginUser();
    } else {
      const enteredFirstName = firstNameInputRef.current.value;
      const enteredLastName = lastNameInputRef.current.value;
      const enteredRole = roleInputRef.current.value;

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
        setIsLoading(false);
        if (res.ok) {
          loginUser();
        } else {
          return res.json().then((data) => {
            let errorMessage = "La création de compte a échouée";
            if (data && data.message) {
              errorMessage = data.message;
            }
            alert(errorMessage);
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
            <label htmlFor="lastname">Nom</label>
            <input id="lastname" required ref={lastNameInputRef} />
          </InputDiv>
        )}
        {!haveAccount && (
          <InputDiv>
            <label htmlFor="firstname">Prénom</label>
            <input id="firstname" required ref={firstNameInputRef} />
          </InputDiv>
        )}
        {!haveAccount && (
          <InputDiv>
            <label htmlFor="role">Role</label>
            <input id="role" required ref={roleInputRef} />
          </InputDiv>
        )}
        <InputDiv>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            required
            autoComplete="currentPassword"
            minLength="4"
            ref={passwordInputRef}
          />
        </InputDiv>
        {isLoading ? (
          <p>Demande en cours....</p>
        ) : (
          <Submit type="submit">
            {haveAccount ? "Connexion" : "S'enregistrer"}{" "}
          </Submit>
        )}
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
