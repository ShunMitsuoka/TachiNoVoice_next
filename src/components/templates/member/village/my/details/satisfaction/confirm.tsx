import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { PolicyCard } from '@/components/modules/member/village/policy/policyCard';
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
        <div className='px-6'>
            {
                categories.map((category, index) => {
                return(
                    <PolicyCard key={index}  category={category} />
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