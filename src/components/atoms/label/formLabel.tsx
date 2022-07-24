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
        <div className={_class}>
            <label htmlFor={htmlFor} id={id} className="text-xl font-bold">
                {children}
                { isRequired && 
                    <span className='inline-block ml-1 text-sm'>
                        ※ 必須
                    </span>
                }
            </label>
        </div>
    );
}