import logo from "../../assets/icon-left-font.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useState, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

import Hamburger from "./hamburger";

import colors from "../../utils/colors";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 105px;
  background-color: ${colors.primary};
`;
const StyledLogo = styled.img`
  height: 40px;
  margin-left: 5vw;
  @media (min-width: 756px) {
    height: 60px;
  }
`;

const StyledList = styled.ul`
  display: flex;
  font-size: 25px;
  margin: 0;
  width: 50%;
  justify-content: space-around;
  align-items: center;
  li {
    list-style: none;
    color: white;
    display: flex;
    align-items: center;
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
  const isAdmin = authCtx.admin;
  const navigate = useNavigate();
  const [isDesktop, setDesktop] = useState(window.innerWidth > 920);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 920);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <StyledNav>
      <div>
        <StyledLogo
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      {isDesktop ? (
        <StyledList>
          {isAdmin && (
            <li>
              <StyledLink to="/signals">Signalements</StyledLink>
            </li>
          )}
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
              <StyledLink to="/">Fil d'Actualité</StyledLink>
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
      ) : (
        isLoggedIn && <Hamburger />
      )}
    </StyledNav>
  );
}

export default Header;
