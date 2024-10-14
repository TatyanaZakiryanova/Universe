'use client';

import React from 'react';
import { useState } from 'react';
import Button from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | undefined;
  description: string;
  center: string;
}

const Modal: React.FC<ModalProps> = React.memo(
  ({ isOpen, onClose, imageSrc, description, center }) => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70" onClick={onClose}>
        <div
          className="relative flex max-h-[80vh] min-h-[30vh] min-w-[20%] max-w-[90%] animate-fadeIn flex-col justify-center rounded-lg bg-customBackground p-2.5 pt-12 text-center text-gray-300"
          onClick={(e) => e.stopPropagation()}
        >
          <Button onClick={onClose} className="absolute right-2 top-2 mb-2.5 px-2 py-0.5">
            X
          </Button>
          <div className="flex max-h-[70vh] max-w-full flex-col items-center overflow-auto">
            {!isImageLoaded && <p>Loading image...</p>}
            <img
              src={imageSrc}
              alt="Full size"
              className="mb-1 object-contain"
              onLoad={() => setIsImageLoaded(true)}
            />
            <span className="mb-1 text-[10px]">Center: {center}</span>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  },
);

export default Modal;
