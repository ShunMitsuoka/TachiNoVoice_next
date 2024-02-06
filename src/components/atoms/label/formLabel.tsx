import React from 'react';

interface Props {
    children?: React.ReactNode;
    htmlFor: string;
    id?: string;
    _class?: string;
    isRequired?:boolean;
}

export const FormLabel: React.FC<Props> = ({
    children,
    htmlFor,
    id,
    _class = '',
    isRequired = false,
}) => {
    return (
        <div className={'flex items-center text-xl '+ _class}>
            <label htmlFor={htmlFor} id={id} className="font-bold">
                {children}
            </label>
            { isRequired && 
                <span className='inline-block px-2 py-1 bg-rose-500 text-white rounded-full ml-2 text-sm'>
                    必須
                </span>
            }
        </div>
    );
}