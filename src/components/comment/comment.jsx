import { useEffect, useState } from "react";

import userIcon from "../../assets/user_icon_color.png";
import styled from "styled-components";

import colors from "../../utils/colors";

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
  div{
      margin-left  14px;
      width : 395px;
      background-color : ${colors.secondaryDark};
      border-radius : 14px;
      font-size: 11px;
      height : 54px;
      h4,p{
          margin : 0px 15px;
      }
      h4{
          margin-top : 9px;
      }
      p{
          margin-bottom : 17px;
      }
      display : flex;
      flex-direction : column;
      justify-content :space-between;


      

  }
`;

const Comment = ({ message, user }) => {
  const [dataComment, setDataComment] = useState();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setDataComment(data.data);
        setisLoading(false);
      });
  }, []);

  return (
    <CommentModel>
      <img src={userIcon} alt="icone utilisateur" />
      {isLoading ? (
        <div></div>
      ) : (
        <div>
          <h4>
            {dataComment.lastname} {dataComment.firstname}
          </h4>
          <p>{message}</p>
        </div>
      )}
    </CommentModel>
  );
};

export default Comment;
