import styled from "styled-components";

import userIcon from "../../assets/user_icon_color.png";

import colors from "../../utils/colors";

const Container = styled.div`
  height: 300px;
  width: 300px;
  margin: 30px auto;
  background-color: ${colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  .user-pic {
    height: 128px;
    border-radius: 45px;
    margin-bottom: 10px;
  }
  .user-name {
    font-size: 24px;
    margin: 0px;
    margin-bottom: 10px;
  }
  .user-role {
    font-size: 15px;
    margin: 0px;
    color: ${colors.grey};
  }
`;

const ProfilHeader = ({ user }) => {
  return (
    <Container>
      <img className="user-pic" src={userIcon} alt="Profil Utilisateur" />
      <h2 className="user-name">
        {user.firstname} {user.lastname}
      </h2>
      <h3 className="user-role">{user.role}</h3>
    </Container>
  );
};

export default ProfilHeader;
