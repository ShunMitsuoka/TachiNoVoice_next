import React from 'react';

interface Props {
    name?: string;
    id?: string;
    value?: string;
    rows?: number;
    cols?: number;
    onChange?: (e: any) => void
}

export const BaseTextArea: React.FC<Props> = ({
    name,
    id,
    value = '',
    onChange,
    rows = 10,
    cols = 30,
}) => {
    return (
        <textarea
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            rows={rows}
            cols={cols}
            className='w-full rounded-md px-2 py-2 resize-none text-main'
        />
    );
}