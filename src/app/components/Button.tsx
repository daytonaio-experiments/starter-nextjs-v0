import { ReactNode } from 'react'

export const Button = ({
    children,
    onClick,
    disabled,
    className,
    variant = "default",
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "outline";
  }) => {
    const baseStyle =
      "px-4 py-2 rounded-md transition-all duration-300 flex items-center justify-center";
    const variantStyles = {
      default: "bg-white text-black hover:bg-gray-200 active:bg-gray-300",
      outline: "border border-gray-700 hover:bg-gray-800 text-white",
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyle} ${variantStyles[variant]} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      >
        {children}
      </button>
    );
  };