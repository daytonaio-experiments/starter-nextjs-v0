import React from "react";

export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-4 rounded-lg max-w-xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="flex justify-end">
          <CloseButton onClick={onClose} className="text-white hover:bg-gray-700">
            Close
          </CloseButton>
        </div>
        {children}
      </div>
    </div>
  );
};

const CloseButton = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);
