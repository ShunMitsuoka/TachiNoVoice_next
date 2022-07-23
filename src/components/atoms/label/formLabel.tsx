import React from 'react';

interface Props {
    children?: React.ReactNode;
    htmlFor: string;
    id?: string;
    _class?: string;
}

export const FormLabel: React.FC<Props> = ({
    children,
    htmlFor,
    id,
    _class = '',
}) => {
    return (
        <div className={_class}>
            <label htmlFor={htmlFor} id={id} className="text-xl font-bold">{children}</label>
        </div>
    );
}