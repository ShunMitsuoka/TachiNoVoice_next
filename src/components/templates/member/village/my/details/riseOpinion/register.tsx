import { BaseButton } from '@/components/atoms/buttons/baseButton';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import React, { useState } from 'react';
import { Category, MyOpinion, Village } from 'villageType';
import { OpinionCard } from '../opinions/opinionCard';

interface Props {
    village: Village;
    category: Category;
    opinion: string;
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
    changeTextAreaHandler,
}) => {
    return (
        <div className=''>
            <div className='py-2 bg-rise text-white text-lg'>
                {
                    category.category_name
                }
            </div>
            <div className='px-4'>
                <div className='mt-4'>
                    {
                        category.opinions &&
                        category.opinions.map((opinion, index) => {
                            return <div key={index} className='mb-4'>
                                <OpinionCard
                                    opinion={opinion} 
                                    villageId={village.village_id} 
                                    myDetails={undefined}                                />
                            </div>
                        })
                    }
                </div>
                <div className='mt-4'>
                    <BaseTextArea
                        value={opinion}
                        onChange={changeTextAreaHandler}
                        rows={5}
                    />
                </div>
                <div className='mt-4 flex justify-between'>
                    <div>
                        <BaseButton onClick={onBack}>戻る</BaseButton>
                    </div>
                    <div>
                        <BaseButton onClick={onConfirm}>確認する</BaseButton>
                    </div>
                </div>
            </div>
        </div>
    )
}