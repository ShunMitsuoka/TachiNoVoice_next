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

export const SetVillageSetting: React.FC<Props> = ({
    formData,
    changeInputHandler,
    changeTextAreaHandler,
    onClickNext,
    onClickCancel,
}) => {

    return (
        <div className='px-10 py-10 bg-p-sub'>
            <div>
                <div className='mb-2'>
                    <FormLabel htmlFor={'core_member_limit'}>コアメンバー</FormLabel>
                </div>
                <div className=''>
                    <FormInput
                        type='number'
                        id='core_member_limit'
                        name='core_member_limit'
                        value={formData.core_member_limit}
                        onChange={changeInputHandler}
                        _class='text-right'
                        widthClass='w-16'
                    />
                    <div className='inline-block ml-4 align-bottom'>
                        人
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <div className='mb-2'>
                    <FormLabel htmlFor={'requirement'}>条件</FormLabel>
                </div>
                <textarea
                    name="requirement"
                    id="requirement"
                    cols={30}
                    rows={6}
                    className='w-full border border-sub rounded-lg px-2 py-2 resize-none'
                    value={formData.requirement}
                    onChange={changeTextAreaHandler}
                >
                </textarea>
            </div>
            <div className='mt-4'>
                <div className='mb-2'>
                    <FormLabel htmlFor={''}>開示条件</FormLabel>
                </div>
                <div className='flex items-center'>
                    <FormCheckBox 
                        name="nickname_flg" 
                        id="nickname_flg" 
                        checked={formData.nickname_flg}
                        onChange={changeInputHandler}
                    />
                    <FormLabel htmlFor={'nickname_flg'} _class={'ml-3'}>ニックネーム</FormLabel>
                </div>
                <div className='flex items-center'>
                    <FormCheckBox 
                        name="age_flg" 
                        id="age_flg" 
                        checked={formData.age_flg}
                        onChange={changeInputHandler}
                    />
                    <FormLabel htmlFor={'age_flg'} _class={'ml-3'}>年齢</FormLabel>
                </div>
                <div className='flex items-center'>
                    <FormCheckBox 
                        name="gender_flg" 
                        id="gender_flg" 
                        checked={formData.gender_flg}
                        onChange={changeInputHandler}
                    />
                    <FormLabel htmlFor={'gender_flg'} _class={'ml-3'}>性別</FormLabel>
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