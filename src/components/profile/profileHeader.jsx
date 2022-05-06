import styled from "styled-components";
import { useState } from "react";

import userIcon from "../../assets/user_icon_color.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import ModifyProfile from "./profileModify";

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
  position: relative;
  .user-pic {
    height: 128px;
    border-radius: 45px;
    margin-bottom: 30px;
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
  .icon-fa {
    position: absolute;
    font-size: 20px;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
`;

const ProfilHeader = ({ userData, setUserData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Container>
        <FontAwesomeIcon
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="icon-fa"
          icon={faPenToSquare}
        />
        <img className="user-pic" src={userIcon} alt="Profil Utilisateur" />
        <h2 className="user-name">
          {userData.firstname} {userData.lastname}
        </h2>
        <h3 className="user-role">{userData.role}</h3>
      </Container>
      {isModalOpen && (
        <ModifyProfile
          setIsModalOpen={setIsModalOpen}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </div>
  );
};

export default ProfilHeader;
