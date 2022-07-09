import React from 'react';

interface Props {
    type: string;
    name?: string;
    id?: string;
    value?: string;
    onChange?: (e: any) => void
}

export const BaseInput: React.FC<Props> = ({
    type = 'text',
    name,
    id,
    value = '',
    onChange,
}) => {
    return (
        <input
            type={type}
            onChange={onChange}
            name={name}
            id={id}
            value={value}
            className='w-full rounded-md px-2 py-2 text-main'
        />
    );
}