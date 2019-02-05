import React from "react";
import PostCreate from "../posts/post_create";
import PostView from "../posts/post_view";

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.removeModal = this.removeModal.bind(this);
  }

  removeModal() {
    this.props.closeModal();
    
    window.onscroll = function () {};
  }
  
  render() {
    const {
      modal,
      closeModal
    } = this.props;

    if (!modal) return null;

    let component;
    switch (modal.type) {
      case "create":
        component = <PostCreate />;
        break;
      case "postView":
        component = <PostView userId={modal.options.thisUser.id}
                              postId={modal.options.post.id}
                              closeModal={closeModal} />;
        break;
      default:
        return null;
    }

    return (
      <div className="modal-background" onClick={this.removeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          {component}
        </div>
      </div>
    )
  }
}

export default Modal;