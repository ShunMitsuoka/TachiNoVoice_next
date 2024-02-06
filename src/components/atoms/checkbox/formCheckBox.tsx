import React from 'react';

interface Props {
    name?: string;
    id?: string;
    checked?: boolean;
    onChange?: (e: any) => void
}

export const FormCheckBox: React.FC<Props> = ({
    name,
    id,
    onChange,
    checked,
}) => {
    return (
        <input
            type={'checkbox'}
            onChange={onChange}
            name={name}
            id={id}
            checked={checked}
            className={'h-4 w-4'}
        />
    );
}