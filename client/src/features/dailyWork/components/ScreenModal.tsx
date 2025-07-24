import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function ScreenModal({ children, onClose }: Props) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  return createPortal(
    <div
      onClick={onClose}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`h-[98vh] w-[58%] overflow-y-auto rounded-xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:w-[90%]`}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}
