import styled from "styled-components";
import colors from "../../utils/colors";
import userIcon from "../../assets/user_icon_color.png";

import { useContext, useState, useEffect } from "react";

import ellipsis from "../../assets/icons/ellipsis-solid.svg";
import AuthContext from "../../store/auth-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

import CommentModule from "../comment/commentModule";
import ModifyPost from "./modifyPost";
import ModalModifyPost from "./modalModifyPost";
import SignalPostModal from "./signalPostModal";

const PostContainer = styled.div`
  background-color: ${colors.secondary};
  border-radius: 20px;
  margin-bottom: 40px;
  margin: 30px auto;
  width: 90%;
  padding: 15px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  .message-content {
    overflow-wrap: break-word;
  }
  @media (min-width: 756px) {
    width: 100%;
    margin: 30px 0px;
  }
`;

const UserDiv = styled.div`
  display: flex;
  .ellipsis {
    height: 15px;
    margin-left: auto;
    cursor: pointer;
  }
  h2 {
    font-size: 12px;
    margin-bottom: -11px;
  }
  h3 {
    font-size: 10px;
    text-align: right;
    font-weight: 400;
  }
  .icon {
    height: 61px;
    border-radius: 47px;
    margin-right: 10px;
  }
`;

const BottomPost = styled.div`
  display: flex;
  justify-content: space-between;
  & .comments {
    cursor: pointer;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  .heart-icon {
    font-size: 25px;
    margin-right: 10px;
    color: ${colors.pink};
    cursor: pointer;
  }
  p {
    font-weight: 500;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  @media (min-width: 756px) {
    height: 400px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Post = ({
  message,
  date,
  postId,
  userId,
  isUserPost,
  dataPosts,
  setDataPosts,
  authUser,
  pictureUrl,
  className,
  isSignalPostPage,
}) => {
  const authCtx = useContext(AuthContext);

  const [likeState, setLikeState] = useState(false);
  const [likeId, setLikeId] = useState();
  const [likeNum, setLikeNum] = useState();

  const [dataUser, setDataUser] = useState([]);
  const [isUserLoading, setUserLoading] = useState(true);
  const [dataComment, setDataComment] = useState();
  const [isCommentLoading, setIsCommentLoading] = useState(true);

  const [commentNumber, setCommentNumber] = useState();
  const [showComments, setShowComments] = useState(false);

  const [dataMessage, setDataMessage] = useState(message);

  const [modifyModal, setModifyModal] = useState(false);
  const [modifyModalPage, setModifyModalPage] = useState(false);

  const [isSignalModalOpen, setIsSignalModalOpen] = useState(false);

  const urlUser = `http://localhost:8000/api/users/${userId}`;
  const urlLikes = `http://localhost:8000/api/likes/post/${postId}`;
  const url = `http://localhost:8000/api/comments?postId=${postId}`;

  const likeHandler = () => {
    fetch("http://localhost:8000/api/likes", {
      method: "POST",
      body: JSON.stringify({
        userId: authCtx.userId,
        postId: postId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "L'envoi du like a échoué";
            if (data && data.message) {
              errorMessage = data.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setLikeState(true);
        setLikeId(data.data.id);
        setLikeNum(likeNum + 1);
      })
      .catch((err) => {});
  };
  const likeDelete = () => {
    fetch(`http://localhost:8000/api/likes/${likeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "L'effacement du like a échoué";
            if (data && data.message) {
              errorMessage = data.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setLikeState(false);
        setLikeNum(likeNum - 1);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const getComments = () => {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setCommentNumber(result.data.length);
            setDataComment(result.data);
            setIsCommentLoading(false);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getComments();
  }, []);

  useEffect(() => {
    const getUsers = () => {
      fetch(urlUser, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setDataUser(result.data);
            setUserLoading(false);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getLikes = () => {
      fetch(urlLikes, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setLikeNum(result.data.length);
            const like = result.data.find(
              (like) => like.userId === authCtx.userId
            );
            if (like) {
              setLikeState(true);
              setLikeId(like.id);
            } else {
              setLikeState(false);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getLikes();
  }, []);

  const handleComments = () => {
    showComments ? setShowComments(false) : setShowComments(true);
  };

  const handleModifyModal = () => {
    modifyModal ? setModifyModal(false) : setModifyModal(true);
  };

  return (
    <PostContainer className={className}>
      {isSignalModalOpen && (
        <SignalPostModal
          setIsSignalModalOpen={setIsSignalModalOpen}
          postId={postId}
          userId={authCtx.userId}
        />
      )}
      {modifyModalPage && (
        <ModalModifyPost
          postId={postId}
          setModifyModalPage={setModifyModalPage}
          setDataMessage={setDataMessage}
          dataMessage={dataMessage}
          pictureUrl={dataUser.profilpic}
        />
      )}
      {isUserLoading ? (
        <div></div>
      ) : (
        <UserDiv>
          <img
            className="icon"
            src={dataUser.profilpic ? dataUser.profilpic : userIcon}
            alt="icone utilisateur"
          />
          <div>
            <h2>
              {dataUser.lastname} {dataUser.firstname}
            </h2>
            <h3>
              Créé le {date.substr(0, 10)} à {date.substr(11, 5)}
            </h3>
          </div>
          {!isSignalPostPage && (
            <img
              onClick={handleModifyModal}
              className="ellipsis"
              src={ellipsis}
              alt="modification"
            />
          )}
        </UserDiv>
      )}
      {modifyModal && (
        <ModifyPost
          isUserPost={isUserPost}
          postId={postId}
          dataPosts={dataPosts}
          setDataPosts={setDataPosts}
          setModifyModal={setModifyModal}
          setModifyModalPage={setModifyModalPage}
          isSignalModalOpen={isSignalModalOpen}
          setIsSignalModalOpen={setIsSignalModalOpen}
        />
      )}
      <p className="message-content">{dataMessage}</p>
      {pictureUrl && (
        <ImageContainer>
          <img src={pictureUrl} alt="Contenu du post" />
        </ImageContainer>
      )}
      <BottomPost>
        <LikeContainer>
          {likeState ? (
            <FontAwesomeIcon
              className="heart-icon"
              icon={faSolidHeart}
              onClick={likeDelete}
            />
          ) : (
            <FontAwesomeIcon
              className="heart-icon"
              icon={faRegularHeart}
              onClick={likeHandler}
            />
          )}
          <p>{likeNum}</p>
        </LikeContainer>
        {!isCommentLoading && (
          <p className="comments" onClick={handleComments}>
            {commentNumber} Commentaires
          </p>
        )}
      </BottomPost>
      {showComments && (
        <CommentModule
          postId={postId}
          commentNumber={commentNumber}
          setCommentNumber={setCommentNumber}
          dataComment={dataComment}
          setDataComment={setDataComment}
          isLoading={isCommentLoading}
          setIsLoading={setIsCommentLoading}
          authUser={authUser}
          profilpic={dataUser.profilpic}
        ></CommentModule>
      )}
    </PostContainer>
  );
};

export default Post;
