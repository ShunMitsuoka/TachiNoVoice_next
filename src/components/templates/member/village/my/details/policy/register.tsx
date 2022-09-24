import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import React from 'react';
import { Category, Village } from 'villageType';

interface Props {
    village: Village;
    category : Category;
    onBack: () => void;
    onRegister: () => void;
    policy: string;
    changeTextAreaHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const RegisterPolicy: React.FC<Props> = ({
    village,
    category,
    onBack,
    onRegister,
    policy,
    changeTextAreaHandler
}) => {

    return (
        <div className=''>
            <div className='py-2 bg-orange text-center text-xl text-white'>
                {category.category_name}
            </div>
            <div className='px-8'>
                <div className='mt-8'>
                    <BaseTextArea
                        value={policy}
                        onChange={changeTextAreaHandler}
                        rows={8}
                    />
                </div>
                <div className='flex justify-between mt-6'>
                    <MiddleButton onClick={onBack}>
                        戻る
                    </MiddleButton>
                    <MiddleButton onClick={onRegister}>
                        登録
                    </MiddleButton>
                </div>
            </div>

        </div>
    )
}