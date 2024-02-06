import React from 'react';
import { slide as Menu } from 'react-burger-menu';

type Props = {
    validationErrors : any;
    id : string;
};

export const ValidationErrors: React.FC<Props> = ({
    validationErrors,
    id,
}) => {

    const contents = () => {
        if(validationErrors == null || typeof validationErrors !== 'object' || validationErrors[id] == undefined){
            return null;
        }
        return (
            <div className='mt-1 text-rose-500'>
                <ul>
                    {
                        validationErrors[id].map((error:string, index:number)=>{
                            return(
                                <li key={index} className='list-disc ml-5'>{error}</li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }


    return (
        <>
            { contents() }
        </>
    )
}