import React from "react";
import PostCreate from "../posts/post_create";

class Modal extends React.Component {
  render() {
    if (!this.props.modal) return null;

    let component;
    switch (this.props.modal) {
      case "create":
        component = <PostCreate />;
        break;
      default:
        return null;
    }

    return (
      <div className="modal-background" onClick={this.props.closeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          {component}
        </div>
      </div>
    )
  }
}

export default Modal;