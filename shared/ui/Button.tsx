import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const Button = ({ children, className = "", ...props }: ButtonProps) => {
    return (
        <button type="button" className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`} {...props}>
            {children}
        </button>
    );
};

export default Button;