import { BaseButton } from '@/components/atoms/buttons/baseButton';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import React, { useState } from 'react';
import { Category, Village } from 'villageType';

interface Props {
    village: Village;
    category: Category;
    opinion:string;
    changeTextAreaHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onConfirm: () => void;
    onBack: () => void;
}

export const Register: React.FC<Props> = ({
    village,
    category,
    onConfirm,
    onBack,
    opinion,
    changeTextAreaHandler
}) => {



    return (
        <div className=''>
            <div>
                {
                    category.category_name
                }
            </div>
            <div>

            </div>
            <div>
                <BaseTextArea
                    value={opinion}
                    onChange={changeTextAreaHandler}
                />
            </div>
            <div className=' flex justify-between'>
                <div>
                    <BaseButton onClick={onBack}>戻る</BaseButton>
                </div>
                <div>
                    <BaseButton onClick={onConfirm}>確認する</BaseButton>
                </div>
            </div>
        </div>
    )
}