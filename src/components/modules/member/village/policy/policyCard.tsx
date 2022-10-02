import React from 'react';
import { Category } from 'villageType';

interface Props {
    category : Category;
    nonePolicyElem? : React.ReactNode;
}

export const PolicyCard: React.FC<Props> = ({
    category,
    nonePolicyElem
}) => {
    return (
        <div className=' bg-white border border-sub rounded-lg shadow-lg overflow-hidden mb-6'>
            <div className=' bg-sub text-white text-xl px-3 py-3 text-center font-bold'>
                {category.category_name}
            </div>
            <div className='px-3 py-2 bg-white'>
            {
                category.policy ? 
                <div className=''>
                    <div className='mb-1 font-bold'>【方針】</div>
                    {category.policy.policy}
                </div>
                :
                nonePolicyElem
            }
            </div>
        </div>
    );
}