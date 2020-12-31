import React from 'react';
import styled from 'styled-components';

import Button from './Button';

import { FiX } from 'react-icons/fi';

type ModalProps = {
    shown: boolean;
    closeModal: () => void;
    title: string;
    children: React.ReactElement;
    actionButtons?: [React.ReactElement];
}

const ModalStyle = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .modal-bg {
        background: rgba(0, 0, 0, 0.65);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .modal {
        background: #fff;
        border-radius: 2px;
        min-width: 500px;
        .modal-top, .modal-bottom {
            height: 60px;
            padding: 0 1em;
        }
        .modal-top {
            border-bottom: 1px solid #eee;
            display: flex;
            flex-direction: row;
            align-items: center;
            .modal-title {
                text-transform: uppercase;
                color: rgba(0, 0, 0, 0.45);
            }
        }
        .modal-bottom {
            border-top: 1px solid #eee;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            > * {
                margin-left: 1em;
            }
        }
        .modal-content {
            padding: 1em;
        }
    }
    @media only screen and (max-width: 800px) {
        .modal {
            min-width: 400px;
        }
    }
    @media only screen and (max-width: 500px) {
        .modal {
            min-width: 0;
            width: 100%;
            height: 100%;
            border-radius: 0;
        }

    }
`;

function Modal(props: ModalProps): React.ReactElement {
    const { actionButtons = [], shown, closeModal, children, title } = props;
    if (!shown) {
        return <></>;
    }
    return (
        <ModalStyle>
            <div onClick={closeModal} className="modal-bg"/>
            <div className="modal">
                <div className="modal-top">
                    <div className="modal-title">
                        {title}
                    </div>
                </div>
                <div className="modal-content">
                    {children}
                </div>
                <div className="modal-bottom">
                    <Button onClick={closeModal}>Close</Button>
                    {actionButtons}
                </div>
            </div>
        </ModalStyle>
    );
}

export default Modal;
