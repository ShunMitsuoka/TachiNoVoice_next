import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { PolicyCard } from '@/components/modules/member/village/policy/policyCard';
import React from 'react';
import { Category, Village } from 'villageType';

interface Props {
    village: Village;
    categories : Category[];
    onDecidePolicy: (category: Category) => void;
    nextPhase: (callbackFunc?: Function | undefined) => void;
}

export const PolicyList: React.FC<Props> = ({
    village,
    categories,
    onDecidePolicy,
    nextPhase
}) => {

    return (
        <div className=''>
            <div className='flex justify-center mb-6'>
                <MiddleButton onClick={nextPhase}>
                    方針確定
                </MiddleButton>
            </div>
            <div className='px-6'>
            {
                categories.map((category, index) => {
                return(
                    <PolicyCard key={index} category={category} nonePolicyElem={
                        <div className="text-center py-4">
                            <MiddleButton onClick={() => {
                                onDecidePolicy(category);
                            }}>
                                方針決定
                            </MiddleButton>
                        </div>
                    }/>
                );
                })
            }
            </div>
        </div>
    )
}