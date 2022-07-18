import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { BaseButton } from './baseButton';

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    _class?: string;
    isSubmit?: boolean;
}

export const LargeButton: React.FC<Props> = ({
    children,
    onClick,
    _class,
    isSubmit = true,
}) => {
    return (
        <BaseButton
            onClick={onClick}
            _class={_class}
            isSubmit={isSubmit}
        >
            {children}
        </BaseButton>
    )
}