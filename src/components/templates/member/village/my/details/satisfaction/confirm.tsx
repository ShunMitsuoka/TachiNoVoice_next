import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import React from 'react';
import { Category, Village } from 'villageType';

interface Props {
    village: Village;
    categories : Category[];
    onAnswere: () => void;
}

export const SatisfactionConfirm: React.FC<Props> = ({
    village,
    categories,
    onAnswere
}) => {

    return (
        <div className=''>
            {
                categories.map((category, index) => {
                return(
                    <div key={index} className={"flex flex-col items-center px-4 py-4 bg-orange mb-8"}>
                    <span className="px-3 py-1 bg-white text-xl rounded-xl">
                        {category.category_name}
                    </span>
                    <div className='w-full px-3 py-2 bg-white rounded-lg mt-4'>
                        {category!.policy!.policy}
                    </div>
                    </div>
                );
                })
            }
            <div className='text-center'>
                <MiddleButton onClick={onAnswere}>
                    アンケートに回答する
                </MiddleButton>
            </div>
        </div>
    )
}