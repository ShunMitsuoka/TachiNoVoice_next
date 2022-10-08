import { BaseButton } from '@/components/atoms/buttons/baseButton';
import { FormInput } from '@/components/atoms/input/formInput';
import { FormLabel } from '@/components/atoms/label/formLabel';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import { ValidationErrors } from '@/components/modules/common/validation/validationErrors';
import { useValidationError } from '@/hooks/common/useValidationError';
import React from 'react';

interface Props {
    formData: any;
    changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changeTextAreaHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClickNext: () => void;
    onClickCancel: () => void;
    validationError: any;
}

export const SetTopic: React.FC<Props> = ({
    formData,
    changeInputHandler,
    changeTextAreaHandler,
    onClickNext,
    onClickCancel,
    validationError,
}) => {
    return (
        <div className='px-10 py-10 bg-p-sub'>
            <div>
                <div className='mb-2'>
                    <FormLabel htmlFor={'title'} isRequired={true}>タイトル</FormLabel>
                </div>
                <FormInput
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={changeInputHandler}
                />
                <ValidationErrors validationErrors={validationError.errors} id={'title'}/>
            </div>
            <div className='mt-4'>
                <div className='mb-2'>
                    <FormLabel htmlFor={'content'}>説明</FormLabel>
                </div>
                <BaseTextArea 
                    name="content"
                    id="content"
                    cols={30}
                    rows={6}
                    value={formData.content}
                    onChange={changeTextAreaHandler}
                />
                <ValidationErrors validationErrors={validationError.errors} id={'content'}/>
            </div>
            <div className='mt-4'>
                <div className='mb-2'>
                    <FormLabel htmlFor={'note'}>注意事項</FormLabel>
                </div>
                <BaseTextArea 
                    name="note"
                    id="note"
                    cols={30}
                    rows={6}
                    value={formData.note}
                    onChange={changeTextAreaHandler}
                />
                <ValidationErrors validationErrors={validationError.errors} id={'note'}/>
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