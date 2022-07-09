import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    color?: string;
    _class?: string;
    isSubmit?: boolean;
}

export const BaseButton: React.FC<Props> = ({
    children,
    onClick,
    color,
    _class,
    isSubmit = true,
}) => {
    let className = "bg-gradient-to-r font-semibold px-4 py-2 rounded-lg w-auto";
    switch (color) {
        case 'red':
            className += '';
            break;
        case 'green':
            className += 'from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white';
            break;
        case 'blue':
            break;
        default:
            className += 'from-cyan-500 to-blue-500 hover:form-cyan-600 hover:to-blue-600 text-white';
    }
    className += ' ' + _class;
    return (
        <button
            type={isSubmit ? 'submit' : 'button'}
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    )
}