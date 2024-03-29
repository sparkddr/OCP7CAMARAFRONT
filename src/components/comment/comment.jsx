import { useContext, useEffect, useState } from "react";

import ellipsis from "../../assets/icons/ellipsis-solid.svg";

import userIcon from "../../assets/user_icon_color.png";
import styled from "styled-components";

import colors from "../../utils/colors";

import AuthContext from "../../store/auth-context";

import CommentModal from "./commentModal";
import SignalCommentModal from "./signalCommentModal";

const CommentModel = styled.div`

    margin-bottom :15px;

  display: flex;
  align-items :center;
  img {
    object-fit : contain;
    align-self : flex-start;
    width: 43px;
    height: 43px;
    border-radius: 29px;
  }
  .commentcontainer{
      margin-left  14px;
      width : 85%;
      background-color : ${colors.secondaryDark};
      border-radius : 14px;
      font-size: 11px;
      min-height : 54px;
      position : relative;
      h4, .comment-message{
          margin : 0px 15px
      }
      h4{
          margin-top : 9px;
      }
      .comment-message{
        overflow-wrap : break-word;
          margin-bottom : 17px;
      }
      display : flex;
      justify-content :space-between;

      .user_message{
        display:flex;
        flex-direction : column;
        justify-content :space-between;
        max-width : 90%;
      }

      img{
        height : 15px;
        align-self : center;
        cursor : pointer;
      }
    

      

  }
`;

const Comment = ({
  message,
  user,
  commentId,
  dataComment,
  setDataComment,
  commentNumber,
  setCommentNumber,
  authUser,
}) => {
  const [dataUser, setDataUser] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const [isSignalCommentModalOpen, setIsSignalCommentModalOpen] =
    useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${user}`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDataUser(data.data);
        setisLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommentModel>
      {isSignalCommentModalOpen && (
        <SignalCommentModal
          commentId={commentId}
          setIsSignalCommentModalOpen={setIsSignalCommentModalOpen}
        />
      )}
      {isLoading ? (
        <div></div>
      ) : (
        <img
          src={dataUser.profilpic ? dataUser.profilpic : userIcon}
          alt="icone utilisateur"
        />
      )}
      {isLoading ? (
        <div></div>
      ) : (
        <div className="commentcontainer">
          <div className="user_message">
            <h4>
              {dataUser.lastname} {dataUser.firstname}
            </h4>
            <p className="comment-message">{message}</p>
          </div>
          {isModalOpen && (
            <CommentModal
              commentId={commentId}
              dataComment={dataComment}
              setDataComment={setDataComment}
              setIsModalOpen={setIsModalOpen}
              commentNumber={commentNumber}
              setCommentNumber={setCommentNumber}
              authUser={authUser}
              setIsSignalCommentModalOpen={setIsSignalCommentModalOpen}
            />
          )}
          <img
            onClick={() => {
              isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
            }}
            src={ellipsis}
            alt="icon modification"
          />
        </div>
      )}
    </CommentModel>
  );
};

export default Comment;
