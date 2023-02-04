import { BaseButton } from '@/components/atoms/buttons/baseButton';
import { FormCheckBox } from '@/components/atoms/checkbox/formCheckBox';
import { FormInput } from '@/components/atoms/input/formInput';
import { FormLabel } from '@/components/atoms/label/formLabel';
import React from 'react';

interface Props {
    formData: any;
    changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changeTextAreaHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClickNext: () => void;
    onClickCancel: () => void;
}

export const SetVillageEndRequirement: React.FC<Props> = ({
    formData,
    changeInputHandler,
    changeTextAreaHandler,
    onClickNext,
    onClickCancel,
}) => {

    return (
        <div className='px-10 py-10 bg-p-sub'>
            <div className='mt-2'>
                <FormLabel htmlFor={''} _class='mb-2'>募集終了条件</FormLabel>
                <div className='flex items-center'>
                    <input 
                        type={'checkbox'} 
                        name="end_by_limit_flg" 
                        id="end_by_limit_flg" 
                        checked={formData.end_by_limit_flg}
                        onChange={changeInputHandler}
                    /> 
                    <FormLabel htmlFor={'end_by_limit_flg'} _class='ml-3'>定員になり次第終了</FormLabel>
                </div>
                <div className='mt-2'>
                    ※手動での終了は常に可能です。
                </div>
            </div>
            <div className='flex justify-between mt-6'>
                <div>
                    <BaseButton onClick={onClickCancel}>キャンセル</BaseButton>
                </div>
                <div>
                    <BaseButton onClick={onClickNext}>次へ</BaseButton>
                </div>
            </div>
        </div>
    )
}