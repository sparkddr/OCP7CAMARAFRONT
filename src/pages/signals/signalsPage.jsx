import { useState, useEffect, useContext } from "react";
import SignalPostsContainer from "../../components/signals/post/signalPostsContainer";
import SignalCommentsContainer from "../../components/signals/comment/signalCommentContainer";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const SignalPage = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 756);
  const authCtx = useContext(AuthContext);
  const admin = authCtx.admin;
  const navigate = useNavigate();

  const updateMedia = () => {
    setDesktop(window.innerWidth > 756);
  };

  useEffect(() => {
    if (admin === false) {
      navigate("/profile");
    }
    if (!authCtx.isLoggedIn) {
      navigate("/auth");
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    admin && (
      <div>
        <SignalPostsContainer isDesktop={isDesktop} />
        <SignalCommentsContainer isDesktop={isDesktop} />
      </div>
    )
  );
};

export default SignalPage;
