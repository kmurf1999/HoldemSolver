import React, { Component } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

const ModalStyle = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-background {
    background: rgba(0, 0, 0, 0.65);
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .modal-container {
    z-index: 9999;
    background: #fff;
    border-radius: 8px;
    /* width: 300px; */
    /* height: 300px; */
    position: relative;
    padding: 16px;
    .modal-menu-bar {
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-close {
      position: relative;
      width: 24px;
      height: 24px;
      outline: 0;
      border: 0;
      background: none;
      cursor: pointer;
      &:after,
      &:before {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 2px;
        height: 24px;
        content: "";
        background: gray;
        position: absolute;
      }
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
    }
  }
`;

type Props = {
  open: boolean;
  closeModal: () => void;
};
type State = {};
class Modal extends Component<Props, State> {
  modalRoot: any;
  element: any;
  constructor(props: Props) {
    super(props);
    this.element = document.createElement("div");
  }
  componentDidMount() {
    if (this.props.open) {
      modalRoot?.appendChild(this.element);
    }
  }
  shouldComponentUpdate(nextProps: Props): boolean {
    if (modalRoot && nextProps.open !== this.props.open) {
      if (nextProps.open) {
        modalRoot?.appendChild(this.element);
      } else if (modalRoot.contains(this.element)) {
        modalRoot?.removeChild(this.element);
      }
      return true;
    }
    return false;
  }
  closeModal = (e: any) => {
    e.stopPropagation();
    this.props.closeModal();
  };
  render() {
    const modal = (
      <ModalStyle>
        <div onClick={this.closeModal} className="modal-background" />
        <div className="modal-container">
          <div className="modal-menu-bar">
            <div className="modal-title header">Select Board</div>
            <button onClick={this.closeModal} className="modal-close"></button>
          </div>
          {this.props.children}
        </div>
      </ModalStyle>
    );
    return createPortal(modal, this.element);
  }
}

export default Modal;
