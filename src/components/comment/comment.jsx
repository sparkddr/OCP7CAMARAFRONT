import { useEffect, useState } from "react";

import ellipsis from "../../assets/icons/ellipsis-solid.svg";

import userIcon from "../../assets/user_icon_color.png";
import styled from "styled-components";

import colors from "../../utils/colors";

import CommentModal from "./commentModal";

const CommentModel = styled.div`

    margin-bottom :15px;

  display: flex;
  align-items :center;
  img {
      align-self : flex-start;
    width: 43px;
    height: 43px;
    border-radius: 29px;
  }
  .commentcontainer{
      margin-left  14px;
      width : 395px;
      background-color : ${colors.secondaryDark};
      border-radius : 14px;
      font-size: 11px;
      height : 54px;
      position : relative;
      h4, .message{
          margin : 0px 15px
      }
      h4{
          margin-top : 9px;
      }
      .message{
          margin-bottom : 17px;
      }
      display : flex;
      justify-content :space-between;

      .user_message{
        display:flex;
        flex-direction : column;
        justify-content :space-between;
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

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setDataUser(data.data);
        setisLoading(false);
      });
  }, []);

  return (
    <CommentModel>
      <img src={userIcon} alt="icone utilisateur" />
      {isLoading ? (
        <div></div>
      ) : (
        <div className="commentcontainer">
          <div className="user_message">
            <h4>
              {dataUser.lastname} {dataUser.firstname}
            </h4>
            <p className="message">{message}</p>
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
