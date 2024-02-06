import React from 'react';

interface Props {
    type: string;
    name?: string;
    id?: string;
    value?: string;
    _class?: string;
    onChange?: (e: any) => void
}

export const BaseInput: React.FC<Props> = ({
    type = 'text',
    name,
    id,
    onChange,
    value = '',
    _class = '',
}) => {
    return (
        <input
            type={type}
            onChange={onChange}
            name={name}
            id={id}
            value={value}
            className={'w-full rounded-md px-2 py-2 text-sub border border-sub ' + _class}
        />
    );
}