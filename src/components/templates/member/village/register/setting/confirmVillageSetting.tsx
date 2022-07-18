import { BaseButton } from '@/components/atoms/buttons/baseButton';
import { FormCheckBox } from '@/components/atoms/checkbox/formCheckBox';
import { FormInput } from '@/components/atoms/input/formInput';
import { FormLabel } from '@/components/atoms/label/formLabel';
import React from 'react';

interface Props {
    formData: any;
    onClickRegister: () => void;
    onClickCancel: () => void;
}

export const ConfirmVillageSetting: React.FC<Props> = ({
    formData,
    onClickRegister,
    onClickCancel,
}) => {

    return (
        <div className='px-10 py-10 bg-p-sub'>
            <div>
                <span className='text-xl font-bold'>タイトル</span>
                <div>
                    {formData.title}
                </div>
            </div>
            <div>
                <span className='text-xl font-bold'>説明</span>
                <div>
                    {formData.content}
                </div>
            </div>
            <div>
                <span className='text-xl font-bold'>注意事項</span>
                <div>
                    {formData.note}
                </div>
            </div>
            <div>
                <span className='text-xl font-bold'>コアメンバー</span>
                <div>
                    {formData.core_member_limit}人
                </div>
            </div>
            <div>
                <span className='text-xl font-bold'>条件</span>
                <div>
                    {formData.requirement}
                </div>
            </div>
            <div>
                <span className='text-xl font-bold'>開示情報</span>
                <div>
                    {formData.nickname_flg && '・ニックネーム'}
                    {formData.age_flg && '・年齢'}
                    {formData.gender_flg && '・性別'}
                </div>
            </div>
            <div>
                <span className='text-xl font-bold'>募集開始条件</span>
                <div>
                    ビレッジ作成後、即時募集開始
                </div>
            </div>
            <div>
                <span className='text-xl font-bold'>募集終了条件</span>
                <div>
                    定員になり次第終了
                </div>
            </div>
            <div className='flex justify-between mt-4'>
                <div>
                    <BaseButton onClick={onClickCancel}>キャンセル</BaseButton>
                </div>
                <div>
                    <BaseButton onClick={onClickRegister}>作成</BaseButton>
                </div>
            </div>
        </div>
    )
}