'use client';

import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | undefined;
  description: string;
  center: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc, description, center }) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center" onClick={onClose}>
      <div
        className="bg-customBackground p-2.5 rounded-lg max-w-[90%] max-h-[80vh] overflow-hidden text-gray-300 text-center flex flex-col justify-center items-stretch animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="bg-customButton text-white self-end mb-2.5 py-0.5 px-2 cursor-pointer border-none rounded transition duration-300 shadow-md hover:bg-customButtonHover hover:-translate-y-1 hover:shadow-lg"
        >
          X
        </button>
        <div className="flex flex-col items-center overflow-auto grow">
          {!isImageLoaded && <p>Loading image...</p>}
          <img
            src={imageSrc}
            alt="Full size"
            className="relative max-w-[100%] max-h-[60vh] mb-1 object-contain"
            onLoad={() => setIsImageLoaded(true)}
          />
          <span className="mb-1 text-[10px]">Center: {center}</span>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
