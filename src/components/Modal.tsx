import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal");

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  action?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({
  action,
  isOpen,
  onClose,
  title,
  children,
}) => {
  const el = document.createElement("div");
  useEffect(() => {
    modalRoot?.appendChild(el);
    return () => {
      modalRoot?.removeChild(el);
    };
  }, [el]);

  const modal = (
    <div
      className={"fixed inset-0 overflow-y-auto"}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-200 bg-opacity-10 transition-all"
          aria-hidden="true"
        />
        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full modal-animate">
          <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="font-bold mb-4 text-white text-xl">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(isOpen ? modal : null, el);
};
