import { BaseButton } from '@/components/atoms/buttons/baseButton';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import React, { useState } from 'react';
import { Category, Village } from 'villageType';

interface Props {
    village: Village;
    category: Category;
    onBack: () => void;
}

export const Complete: React.FC<Props> = ({
    village,
    category,
    onBack,
}) => {
    return (
        <div className=''>
            <div className='py-2 text-white bg-rise text-lg'>
                {
                    category.category_name
                }
            </div>
            <div className='my-8 px-6'>
                ご意見、有難うございます。<br />
                他カテゴリーへの意見投稿もよろしくお願いいたします。
            </div>
            <div className=' flex justify-center'>
                <div>
                    <BaseButton onClick={onBack}>戻る</BaseButton>
                </div>
            </div>
        </div>
    )
}