import { BaseButton } from '@/components/atoms/buttons/baseButton';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import React, { useState } from 'react';
import { Category, Village } from 'villageType';

interface Props {
    village: Village;
    category: Category;
    opinion:string;
    onRegister: () => void;
    onBack: () => void;
}

export const Confirm: React.FC<Props> = ({
    village,
    category,
    onRegister,
    onBack,
    opinion,
}) => {
    return (
        <div className=''>
            <div>
                {
                    category.category_name
                }
            </div>
            <div>
                {opinion}
            </div>
            <div className=' flex justify-between'>
                <div>
                    <BaseButton onClick={onBack}>戻る</BaseButton>
                </div>
                <div>
                    <BaseButton onClick={onRegister}>意見する</BaseButton>
                </div>
            </div>
        </div>
    )
}