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
    return (
        <button
            type={isSubmit ? 'submit' : 'button'}
            className={'font-semibold px-5 py-3 rounded-lg w-auto bg-sub text-main'}
            onClick={onClick}
        >
            {children}
        </button>
    )
}