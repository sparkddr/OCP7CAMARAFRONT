import { useRef, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import colors from "../../utils/colors";
import userIcon from "../../assets/user_icon_color.png";

import NewPostModal from "./newPostModal";

const Container = styled.div`
  background-color: ${colors.secondary};
  border-radius: 20px;
  margin-bottom: 40px;
  margin: 30px 0px;
  height: 100px;
  width: 100%;
  padding: 5px 20px 30px 20px;
  display: flex;
  align-items: center;
  position: relative;
  img {
    height: 61px;
    border-radius: 47px;
    margin-right: 10px;
  }
  input {
    width: 320px;
    height: 40px;
    border-radius: 47px;
    margin-left: 17px;
    background-color: ${colors.secondaryDark};
    padding-left: 20px;
    border: none;
  }
  button {
    all: unset;
    margin-left: 20px;
    padding: 5px 8px;
    border-radius: 10px;
    background-color: #3b8ea5;
    color: white;
    font-weight: bold;
    font-size: 13px;
    cursor: pointer;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 0%;
  right: 25%;
  width: 50%;
  display: flex;
  justify-content: center;

  .icon-div {
    margin: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .icon-image {
      font-size: 25px;
    }
    p {
      font-size: 13px;
      margin-left: 5px;
      text-align: center;
    }
  }
`;

const NewPost = ({ dataPosts, setDataPosts, setIsPostLoading }) => {
  const postInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [dataUser, setDataUser] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${authCtx.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setDataUser(data.data);
        setIsDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendPost = (event) => {
    const enteredPost = postInputRef.current.value;

    event.preventDefault();
    fetch("http://localhost:8000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        userId: authCtx.userId,
        message: enteredPost,
      }),
      headers: {
        "Content-Type": "application/json",
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return isDataLoading ? (
    <div></div>
  ) : (
    <Container>
      <img
        src={dataUser.profilpic ? dataUser.profilpic : userIcon}
        alt="icone utilisateur"
      />
      <form onSubmit={sendPost}>
        <input
          type="text"
          defaultValue={"What's up " + dataUser.firstname + "?"}
          ref={postInputRef}
        />
        <button type="submit"> Envoyer</button>
      </form>
      <IconContainer>
        <div
          className="icon-div"
          onClick={() => {
            setIsPostModalOpen(true);
          }}
        >
          <FontAwesomeIcon
            icon={faImage}
            className="icon-image"
          ></FontAwesomeIcon>
          <p>Ajouter une image / un GIF</p>
        </div>
      </IconContainer>
      {isPostModalOpen && (
        <NewPostModal
          profilpic={dataUser.profilpic ? dataUser.profilpic : userIcon}
          dataUser={dataUser}
          dataPosts={dataPosts}
          setDataPosts={setDataPosts}
          setIsPostModalOpen={setIsPostModalOpen}
        />
      )}
    </Container>
  );
};

export default NewPost;
