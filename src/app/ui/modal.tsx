'use client';

import React from 'react';
import { useState } from 'react';
import Button from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageSrc: string | undefined;
  description: string;
  date_created: string;
  center: string;
}

const Modal: React.FC<ModalProps> = React.memo(
  ({ isOpen, onClose, title, imageSrc, description, center, date_created }) => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70" onClick={onClose}>
        <div
          className="relative flex max-h-[80vh] min-h-[30vh] min-w-[20%] max-w-[90%] animate-fadeIn flex-col justify-center rounded-lg bg-customBackground p-2.5 pt-8 text-center text-gray-300"
          onClick={(e) => e.stopPropagation()}
        >
          <Button onClick={onClose} className="absolute right-2 top-2 mb-2 px-2 py-0.5">
            X
          </Button>
          <span className="mb-2 text-base">{title}</span>
          <div className="flex max-h-[70vh] max-w-full flex-col items-center overflow-auto">
            {!isImageLoaded && <p>Loading image...</p>}
            <img
              src={imageSrc}
              alt="Full size"
              className="mb-1 rounded-sm object-contain"
              onLoad={() => setIsImageLoaded(true)}
            />
            <span className="mb-1 text-[10px]">{date_created}</span>
            <span className="mb-1 text-[10px]">Center: {center}</span>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';
export default Modal;
