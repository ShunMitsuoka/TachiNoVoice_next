import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
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
            {
                categories.map((category, index) => {
                return(
                    <div key={index} className={"flex flex-col items-center px-4 py-4 bg-orange mb-8"}>
                    <span className="px-3 py-1 bg-white text-xl rounded-xl">
                        {category.category_name}
                    </span>
                    {
                        category.policy ? 
                        <div className='w-full px-3 py-2 bg-white rounded-lg mt-4'>
                            {category.policy.policy}
                        </div>
                        :
                        <div className="mt-4">
                            <MiddleButton onClick={() => {
                                onDecidePolicy(category);
                            }}>
                                方針決定
                            </MiddleButton>
                        </div>
                    }
                    </div>
                );
                })
            }
        </div>
    )
}