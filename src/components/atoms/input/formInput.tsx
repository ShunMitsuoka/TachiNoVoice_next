import React from 'react';

interface Props {
    type?: string;
    name?: string;
    id?: string;
    value?: string;
    _class?: string;
    widthClass?: string;
    onChange?: (e: any) => void
}

export const FormInput: React.FC<Props> = ({
    type = 'text',
    name,
    id,
    onChange,
    value = '',
    _class = '',
    widthClass,
}) => {

    if(!widthClass){
        widthClass = 'w-full'
    }

    return (
        <input
            type={type}
            onChange={onChange}
            name={name}
            id={id}
            value={value}
            className={widthClass + ' rounded-md px-2 py-2 text-sub border border-sub ' + _class}
        />
    );
}