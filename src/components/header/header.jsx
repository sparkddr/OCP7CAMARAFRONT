import logo from "../../assets/icon-left-font.png";
import styled from "styled-components";

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

const StyledLink = styled.div`
  display: flex;
  font-size: 25px;
  width: 50%;
  justify-content: space-around;
  align-items: center;
`;

function Header() {
  return (
    <StyledNav>
      <div>
        <StyledLogo src={logo} alt="logo" />
      </div>
      <StyledLink>
        <p>Fil d'actualité</p>
        <p>Mon profil</p>
      </StyledLink>
    </StyledNav>
  );
}

export default Header;
