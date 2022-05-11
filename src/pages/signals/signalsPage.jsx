import SignalPostsContainer from "../../components/signals/post/signalPostsContainer";
import SignalCommentsContainer from "../../components/signals/comment/signalCommentContainer";

const SignalPage = () => {
  return (
    <div>
      <SignalPostsContainer />
      <SignalCommentsContainer />
    </div>
  );
};

export default SignalPage;
