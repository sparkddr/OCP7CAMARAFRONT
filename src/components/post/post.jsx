import styled from "styled-components";
import colors from "../../utils/colors";
import userIcon from "../../assets/user_icon_color.png";

import heartEmpty from "../../assets/icons/heart-regular.svg";

const PostContainer = styled.div`
  background-color: ${colors.secondary};
  border-radius: 20px;
  margin-bottom: 40px;
  margin: 30px auto;
  padding: 13px 20px 0px 20px;
`;

const UserDiv = styled.div`
  display: flex;
  h2 {
    font-size: 12px;
    margin-bottom: -11px;
  }
  h3 {
    font-size: 10px;
    text-align: right;
    font-weight: 400;
  }
  img {
    height: 61px;
    border-radius: 47px;
    margin-right: 10px;
  }
`;

const BottomPost = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    p {
      margin-left: 10px;
    }
  }
`;

const Post = ({ message }) => {
  return (
    <PostContainer>
      <UserDiv>
        <img src={userIcon} alt="icone utilisateur" />
        <div>
          <h2>Nom Prénom</h2>
          <h3>Il y a ...</h3>
        </div>
      </UserDiv>
      <p>{message}</p>
      <BottomPost>
        <div>
          <img src={heartEmpty} alt="like" />
          <p>18</p>
        </div>
        <p> 33 Commentaires</p>
      </BottomPost>
    </PostContainer>
  );
};

export default Post;
