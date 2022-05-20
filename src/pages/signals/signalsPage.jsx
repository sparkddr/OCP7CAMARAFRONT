import { useState, useEffect } from "react";
import SignalPostsContainer from "../../components/signals/post/signalPostsContainer";
import SignalCommentsContainer from "../../components/signals/comment/signalCommentContainer";

const SignalPage = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 756);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 756);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <div>
      <SignalPostsContainer isDesktop={isDesktop} />
      <SignalCommentsContainer isDesktop={isDesktop} />
    </div>
  );
};

export default SignalPage;
