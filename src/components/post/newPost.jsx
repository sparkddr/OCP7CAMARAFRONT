import { useRef, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faImages } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import colors from "../../utils/colors";
import userIcon from "../../assets/user_icon_color.png";

const Container = styled.div`
  background-color: ${colors.secondary};
  border-radius: 20px;
  margin-bottom: 40px;
  margin: 30px 0px;
  width: 100%;
  padding: 20px 20px 10px 20px;

  .top-container {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #d2d2d2;
  }

  .img-profil {
    height: 61px;
    border-radius: 47px;
    margin-right: 10px;
  }

  .img-prev {
    width: 100%;
    object-fit: cover;
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
  margin: auto;
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
      font-weight: 600;
      margin-left: 5px;
      text-align: center;
    }
  }
  input {
    position: absolute;
    z-index: -1;
    height: 0.1px;
    width: 0.1px;
  }
`;

const NewPost = ({ dataPosts, setDataPosts, setIsPostLoading }) => {
  const postInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [dataUser, setDataUser] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [picture, setPicture] = useState("init");
  const [pictureUrl, setPictureUrl] = useState("vibe");
  // const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${authCtx.userId}`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDataUser(data.data);
        setIsDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (picture === "init") {
      return;
    } else {
      const newPictureUrl = URL.createObjectURL(picture);
      setPictureUrl(newPictureUrl);
    }
  }, [picture]);

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
        setPictureUrl("vibe");
        setPicture("init");
      })
      .catch((err) => {
        console.log(err);
      });

    e.target.reset();
  };
  return isDataLoading ? (
    <div></div>
  ) : (
    <Container>
      <form onSubmit={sendPost}>
        <div className="top-container">
          <img
            className="img-profil"
            src={dataUser.profilpic ? dataUser.profilpic : userIcon}
            alt="icone utilisateur"
          />
          <div>
            <input
              type="text"
              placeholder={"What's up " + dataUser.firstname + "?"}
              required
              ref={postInputRef}
            />
            <button type="submit"> Envoyer</button>
          </div>
        </div>
        {pictureUrl !== "vibe" && (
          <img className="img-prev" src={pictureUrl} alt="prévisualisation" />
        )}
        <IconContainer>
          <label className="icon-div" htmlFor="picture">
            <FontAwesomeIcon
              icon={faImage}
              className="icon-image"
            ></FontAwesomeIcon>
            <p>Photo/GIF</p>
          </label>
          <input
            id="picture"
            name="picture"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setPicture(e.target.files[0]);
            }}
          ></input>
        </IconContainer>
      </form>
    </Container>
  );
};

export default NewPost;
