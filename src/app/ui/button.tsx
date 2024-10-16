'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`rounded-lg border-none bg-customButton text-white shadow-md transition duration-300 ${
        disabled
          ? 'cursor-not-allowed bg-gray-300'
          : 'cursor-pointer hover:-translate-y-1 hover:bg-customButtonHover hover:shadow-lg'
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
