import { BaseButton } from '@/components/atoms/buttons/baseButton';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import React, { useState } from 'react';
import nl2br from 'react-nl2br';
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
            <div className='py-2 text-white bg-rise text-lg'>
                {
                    category.category_name
                }
            </div>
            <div className='px-6'>
                <div className='mt-6'>
                    以下の意見でよろしいですか？
                </div>
                <div className='w-full mt-6 text-lg'>
                {nl2br(opinion)}
                </div>
                <div className=' flex justify-between mt-6'>
                    <BaseButton onClick={onBack}>戻る</BaseButton>
                    <BaseButton onClick={onRegister}>意見する</BaseButton>
                </div>
            </div>
        </div>
    )
}