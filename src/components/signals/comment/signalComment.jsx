import styled from "styled-components";

const Signal = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 2fr 1fr;
  text-align: center;
`;

const SignalComment = ({
  signalId,
  user,
  message,
  postId,
  setSignalCommentData,
  signalCommentData,
}) => {
  const deleteSignal = () => {
    fetch(`http://localhost:8000/api/signal/comments/${signalId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setSignalCommentData(
          signalCommentData.filter((signal) => signal.id !== signalId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Signal>
      <p># {signalId}</p>
      <p>Voir le post</p>
      <p>
        {user.firstname} {user.lastname}
      </p>
      <p>{message}</p>
      <p onClick={deleteSignal}>Effacer</p>
    </Signal>
  );
};

export default SignalComment;
