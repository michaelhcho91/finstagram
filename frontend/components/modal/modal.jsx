import React from "react";
import PostCreate from "../posts/post_create";
import PostView from "../posts/post_view";
import FollowerList from "../user/user_follower_list";
import FollowingList from "../user/user_following_list";

const Modal = ({ closeModal, modal }) => {
  if (!modal) return null;

  let component;
  switch (modal.type) {
    case "create":
      component = <PostCreate />;
      break;

    case "postView":
      component = <PostView userId={modal.options.thisUser.id}
                            postId={modal.options.post.id} />;
      break;

    case "followers":
      component = <FollowerList thisUser={modal.options.thisUser} />;
      break;

    case "following":
      component = <FollowingList thisUser={modal.options.thisUser} />;
      break;

    default:
      return null;
  }
  
  return (
    <>
      <div className="modal-background" onClick={closeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          {component}
        </div>
      </div>
    </>
  )
}

export default Modal;