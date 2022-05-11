import { useContext, useRef, useState } from "react";

import styled from "styled-components";
import colors from "../../utils/colors";

import AuthContext from "../../store/auth-context";

const Container = styled.div`
  position: fixed;
  top: 25%;
  right: 50%-250px;
  z-index: 6;
  background-color: white;
  width: 500px;
  height: 55%;
  text-align: center;
  border-radius: 18px;
  h2 {
    font-size: 18px;
  }
  form {
    height: 80%;
  }
  .user-container {
    display: flex;
    width: 90%;
    margin: auto;
    h3 {
      font-size: 13px;
    }
  }
`;

const FileContainer = styled.div`
  width: 90%;
  margin: 20px auto;
  height: 60%;
  background-color: ${colors.secondaryDark};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
`;

const TextContainer = styled.div`
  margin-top: 10px;

  input {
    width: 87%;
    margin: auto;
  }
`;

const NewPostModal = ({
  profilpic,
  dataUser,
  dataPosts,
  setDataPosts,
  setIsPostModalOpen,
}) => {
  const authCtx = useContext(AuthContext);
  const postInputRef = useRef();

  const [picture, setPicture] = useState();

  const sendPost = (e) => {
    e.preventDefault();

    const sendBody = {
      userId: authCtx.userId,
      message: postInputRef.current.value,
    };
    const dataForm = new FormData();
    dataForm.append("post", JSON.stringify(sendBody));
    dataForm.append("picture", picture);

    fetch(`http://localhost:8000/api/posts`, {
      method: "POST",
      body: dataForm,
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "L'envoi a échoué";
            if (data && data.message) {
              errorMessage = data.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((res) => {
        setDataPosts([...dataPosts, res.data]);
        setIsPostModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <h2>Créer une publication</h2>
      <div className="user-container">
        <img src={profilpic} alt="profil"></img>
        <h3>
          {dataUser.firstname} {dataUser.lastname}
        </h3>
      </div>
      <form onSubmit={sendPost}>
        <TextContainer className="form-text">
          <input
            type="text"
            defaultValue={"What's up " + dataUser.firstname + "?"}
            ref={postInputRef}
          />
        </TextContainer>
        <FileContainer>
          <input
            type="file"
            name="media"
            id="media"
            accept="image/png, image/jpeg, image/gif"
            onChange={(e) => setPicture(e.target.files[0])}
          ></input>
          <label htmlFor="media">Choisir une photo</label>
        </FileContainer>
        <div>
          <button type="submit">Publier</button>
          <button
            onClick={() => {
              setIsPostModalOpen(false);
            }}
          >
            Annuler
          </button>
        </div>
      </form>
    </Container>
  );
};

export default NewPostModal;
