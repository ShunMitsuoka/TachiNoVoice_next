import React from 'react';
import { Category, Satisfaction } from 'villageType';
import dynamic from "next/dynamic";

interface Props {
    category : Category;
    nonePolicyElem? : React.ReactNode;
    satisfactions? : Satisfaction[];
}

const SatisfactionGraph = dynamic(() => import("./satisfactionGraph"), { ssr: false });

export const PolicyCard: React.FC<Props> = ({
    category,
    nonePolicyElem,
    satisfactions
}) => {
    return (
        <div className=' bg-white border border-sub rounded-lg shadow-lg overflow-hidden mb-6'>
            <div className=' bg-sub text-white text-xl px-3 py-3 text-center font-bold'>
                {category.category_name}
            </div>
            <div className='px-3 py-2 bg-white'>
            {
                category.policy ? 
                <>
                    <div className=''>
                        <div className='mb-1 font-bold'>【方針】</div>
                        {category.policy.policy}
                    </div>
                    {
                        satisfactions && 
                        <div className='mt-2'>
                            <div className='mb-1 font-bold'>【満足度】</div>
                            <div className="relative w-28 h-32">
                                <SatisfactionGraph data={satisfactions} />
                            </div>
                        </div>
                    }
                </>
                :
                nonePolicyElem
            }
            </div>
        </div>
    );
}