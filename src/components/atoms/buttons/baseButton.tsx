import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    _class?: string;
    isSubmit?: boolean;
}

export const BaseButton: React.FC<Props> = ({
    children,
    onClick,
    _class,
    isSubmit = true,
}) => {
    return (
        <button
            type={isSubmit ? 'submit' : 'button'}
            className={'font-semibold px-5 py-2 rounded-lg w-auto bg-sub text-main drop-shadow-lg ' + _class}
            onClick={onClick}
        >
            {children}
        </button>
    )
}