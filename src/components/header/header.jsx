import logo from "../../assets/icon-left-font.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import colors from "../../utils/colors";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 105px;
  background-color: ${colors.primary};
`;
const StyledLogo = styled.img`
  height: 60px;
  margin-left: 60px;
`;

const StyledList = styled.ul`
  display: flex;
  font-size: 25px;
  width: 50%;
  justify-content: space-around;
  align-items: center;
  li {
    list-style: none;
    color: white;
  }
`;
const StyledLink = styled(Link)`
  all: unset;
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

function Header() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <StyledNav>
      <div>
        <StyledLogo src={logo} alt="logo" />
      </div>
      <StyledList>
        {!isLoggedIn && (
          <li>
            <StyledLink to="/auth">Se connecter</StyledLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <StyledLink to="/profile">Mon Profil</StyledLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <StyledLink to="/posts">Fil d'Actualité</StyledLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <StyledLink to="/auth" onClick={authCtx.logout}>
              Se déconnecter
            </StyledLink>
          </li>
        )}
      </StyledList>
    </StyledNav>
  );
}

export default Header;
