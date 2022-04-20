import logo from "../../assets/icon-left-font.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
`;
const StyledLogo = styled.img`
  height: 80px;

  margin-left: 60px;
`;

const StyledLink = styled.ul`
  display: flex;
  font-size: 25px;
  width: 50%;
  justify-content: space-around;
  align-items: center;
  li {
    list-style: none;
  }
`;

function Header() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <StyledNav>
      <div>
        <StyledLogo src={logo} alt="logo" />
      </div>
      <StyledLink>
        {!isLoggedIn && (
          <li>
            <Link to="/auth">Se connecter</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/profil">Mon Profil</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/profil">Se déconnecter</Link>
          </li>
        )}
      </StyledLink>
    </StyledNav>
  );
}

export default Header;
