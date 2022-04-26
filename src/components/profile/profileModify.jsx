import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const ModifyProfile = () => {
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const SubmitForm = (e) => {
    e.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    fetch(`http://localhost:8000/api/users/${authCtx.userId}`, {
      method: "PUT",
      body: JSON.stringify({
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/posts");
      });
  };

  return (
    <form>
      <h1>Modifier mon profil</h1>
      <div>
        <label>Nouveau mot de passe</label>
        <input type="password" id="new-password" ref={passwordInputRef}></input>
      </div>
      <button onClick={SubmitForm}>Modifier le mot de passe</button>
    </form>
  );
};

export default ModifyProfile;
