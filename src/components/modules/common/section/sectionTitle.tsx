import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const SectionTitle: React.FC<Props> = ({
    children,
    className = '',
}) => {
    return (
        <div className={"border-b border-sub font-bold " + className}>{children}</div>
    )
}