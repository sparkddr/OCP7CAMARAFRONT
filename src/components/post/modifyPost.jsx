import styled from "styled-components";
import colors from "../../utils/colors";

const Modal = styled.div`
  position: absolute;
  background-color: ${colors.secondaryDark};
  padding: 5px;
  margin: 0;
  font-size: 12px;
  line-height: 7px;
  top: 29px;
  right: 17px;
  border-radius: 9px;
  border: 0.5px solid black;
  p {
    cursor: pointer;
  }
`;

const ModifyPost = ({
  isUserPost,
  postId,
  setDataPosts,
  dataPosts,
  setModifyModalPage,
}) => {
  const deletePost = () => {
    fetch(`http://localhost:8000/api/posts/${postId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setDataPosts(dataPosts.filter((post) => post.id !== postId));
      });
  };

  const modifyHandler = (e) => {
    e.preventDefault();
    setModifyModalPage(true);
  };

  return (
    <Modal postId={postId}>
      {isUserPost ? (
        <div>
          <p onClick={modifyHandler}>Modifier Post</p>
          <p onClick={deletePost}>Supprimer Post</p>
        </div>
      ) : (
        <p>Signaler Post</p>
      )}
    </Modal>
  );
};

export default ModifyPost;
