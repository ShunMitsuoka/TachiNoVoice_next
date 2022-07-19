import { BaseButton } from '@/components/atoms/buttons/baseButton';
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

export const SetTopic: React.FC<Props> = ({
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
                    <FormLabel htmlFor={'title'}>タイトル</FormLabel>
                </div>
                <FormInput
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={changeInputHandler}
                />
            </div>
            <div className='mt-4'>
                <div className='mb-2'>
                    <FormLabel htmlFor={'content'}>説明</FormLabel>
                </div>
                <textarea
                    name="content"
                    id="content"
                    cols={30}
                    rows={6}
                    className='w-full border border-sub rounded-lg px-2 py-2'
                    value={formData.content}
                    onChange={changeTextAreaHandler}
                >
                </textarea>
            </div>
            <div className='mt-4'>
                <div className='mb-2'>
                    <FormLabel htmlFor={'note'}>注意事項</FormLabel>
                </div>
                <textarea
                    name="note"
                    id="note"
                    cols={30}
                    rows={6}
                    className='w-full border border-sub rounded-lg px-2 py-2'
                    value={formData.note}
                    onChange={changeTextAreaHandler}
                >
                </textarea>
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