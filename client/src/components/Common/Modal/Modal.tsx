import './Modal.scss';

import React from 'react';
import ReactDOM from 'react-dom';

export * from './useModal';

interface ModalProps {
  isShowing: boolean;
  hide(): void;
  children: JSX.Element;
}

const _Modal = ({
  isShowing,
  hide,
  children,
}: ModalProps): JSX.Element | null =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <button
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={hide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              {children}
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export const Modal = _Modal;
