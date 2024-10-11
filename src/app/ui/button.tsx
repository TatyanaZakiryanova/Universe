'use client';

interface Button {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<Button> = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`bg-customButton text-white border-none rounded-lg transition duration-300 shadow-md ${
        disabled
          ? 'cursor-not-allowed bg-gray-300'
          : 'cursor-pointer hover:bg-customButtonHover hover:-translate-y-1 hover:shadow-lg'
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
