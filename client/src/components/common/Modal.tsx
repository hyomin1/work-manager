import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: Props) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  return createPortal(
    <div
      onClick={onClose}
      className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900/40 px-4 backdrop-blur-[2px]'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative w-full max-w-2xl transform rounded-2xl bg-gradient-to-b from-white to-gray-50 shadow-[0_0_50px_rgba(0,0,0,0.15)] transition-all'
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}
