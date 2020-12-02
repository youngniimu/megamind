import './Modal.scss';

import React from 'react';
import ReactDOM from 'react-dom';

export * from '../../../hooks/useModal';

interface ModalProps {
  isShowing: boolean;
  hide(): void;
  children: JSX.Element;
}

const Modal = ({ isShowing, hide, children }: ModalProps): JSX.Element | null =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-wrapper">
            <div className="modal">
              <button className="modal-close-button" onClick={hide}>
                Close
              </button>
              {children}
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export { Modal };
