import React from 'react';

interface Props {
    children?: React.ReactNode;
    htmlFor: string;
    _class?: string;
}

export const FormLabel: React.FC<Props> = ({
    children,
    htmlFor,
    _class = '',
}) => {
    return (
        <div className={_class}>
            <label htmlFor={htmlFor} className="text-xl font-bold">{children}</label>
        </div>
    );
}