import { ReactNode } from 'react'

export const Button = ({
    children,
    onClick,
    disabled,
    className,
    variant = 'default'
}: {
    children: ReactNode,
    onClick?: () => void,
    disabled?: boolean,
    className?: string,
    variant?: 'default' | 'outline'
}) => {
    const baseStyle = "w-full py-2 rounded-md transition-colors duration-200 flex items-center justify-center"
    const variantStyles = {
        default: "bg-white text-black hover:bg-gray-200",
        outline: "border border-gray-700 hover:bg-gray-800 text-white"
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    )
}