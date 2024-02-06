import React from 'react';

interface Props {
    children?: React.ReactNode;
    name?: string;
    id?: string;
    value?: string;
    defaultValue?: string;
    _class?: string;
    onChange?: (e: any) => void;
}

export const FormSelect: React.FC<Props> = ({
    children,
    name,
    id,
    value,
    defaultValue,
    _class = '',
    onChange,
}) => {
    return (
        <select 
            name={name} 
            id={id} 
            value={value} 
            defaultValue={defaultValue}
            onChange={onChange}
            className={'w-full h-12 rounded-md px-2 py-2 text-sub border border-sub ' + _class}
        >
            {children}
        </select>
    );
}