import React from "react";
import PostCreate from "../posts/post_create";

class Modal extends React.Component {
  render() {
    const { modal, closeModal } = this.props;

    if (!modal) return null;

    let component;
    switch (modal) {
      case "create":
        component = <PostCreate />;
        break;
      default:
        return null;
    }

    return (
      <div className="modal-background" onClick={closeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          {component}
        </div>
      </div>
    )
  }
}

export default Modal;