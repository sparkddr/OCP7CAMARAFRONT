import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./hamburger.css";
import AuthContext from "../../store/auth-context";

const Hamburger = () => {
  const [menuChange, setMenuChange] = useState(false);
  const [navChange, setNavChange] = useState(false);
  const [menuBChange, setMenuBChange] = useState(false);

  const authCtx = useContext(AuthContext);

  const menuOnClick = () => {
    menuChange ? setMenuChange(false) : setMenuChange(true);
    navChange ? setNavChange(false) : setNavChange(true);
    menuBChange ? setMenuBChange(false) : setMenuBChange(true);
  };

  return (
    <div>
      <div
        onClick={() => {
          menuOnClick();
        }}
        id="menu"
      >
        <div id="menu-bar" className={menuChange ? "change" : ""}>
          <div id="bar1" class="bar"></div>
          <div id="bar2" class="bar"></div>
          <div id="bar3" class="bar"></div>
        </div>
        <div class={`hamburger ${navChange ? "change" : ""}`} id="nav">
          <ul>
            {authCtx.isAdmin && (
              <li>
                <Link to="/signals">Signalements</Link>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <Link to="/profile">Mon profil</Link>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <Link to="/">Fil d'actualités</Link>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <Link to="/auth" onClick={authCtx.logout}>
                  Se déconnecter
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div
        class={`menu-bg ${menuBChange ? "change-bg" : ""}`}
        id="menu-bg"
      ></div>
    </div>
  );
};
export default Hamburger;
