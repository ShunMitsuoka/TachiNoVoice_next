import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import React from 'react';
import { Category, Village } from 'villageType';

interface Props {
    village: Village;
    categories : Category[];
    onDecidePolicy: (category: Category) => void;
}

export const PolicyList: React.FC<Props> = ({
    village,
    categories,
    onDecidePolicy
}) => {

    return (
        <div className=''>
            {
                categories.map((category, index) => {
                return(
                    <div key={index} className={"flex flex-col items-center py-4 bg-orange mb-8"}>
                    <span className="px-3 py-1 bg-white text-xl rounded-xl">
                        {category.category_name}
                    </span>
                    <div className="mt-4">
                        <MiddleButton onClick={() => {
                            onDecidePolicy(category);
                        }}>
                            方針決定
                        </MiddleButton>
                    </div>
                    </div>
                );
                })
            }
        </div>
    )
}