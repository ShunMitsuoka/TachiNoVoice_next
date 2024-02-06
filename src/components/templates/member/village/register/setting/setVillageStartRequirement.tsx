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

export const SetVillageStartRequirement: React.FC<Props> = ({
    formData,
    changeInputHandler,
    changeTextAreaHandler,
    onClickNext,
    onClickCancel,
}) => {

    return (
        <div className='px-10 py-10 bg-p-sub'>
            <div className='mt-2'>
                <FormLabel htmlFor={''} _class='mb-2'>募集開始条件</FormLabel>
                <div className='flex items-center'>
                    <input 
                        type={'checkbox'} 
                        name="start_by_instant_flg" 
                        id="start_by_instant_flg" 
                        checked={formData.start_by_instant_flg}
                        onChange={changeInputHandler}
                    /> 
                    <FormLabel htmlFor={'start_by_instant_flg'} _class='ml-3'>ビレッジ作成後、即時募集開始</FormLabel>
                </div>
                <div className='mt-2'>
                    ※手動での開始は常に可能です。
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