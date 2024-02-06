import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { FormCheckBox } from '@/components/atoms/checkbox/formCheckBox';
import { FormLabel } from '@/components/atoms/label/formLabel';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import React from 'react';
import { Category, Village } from 'villageType';

interface Props {
    village: Village;
    category : Category;
    comment : string;
    isPublicComment : boolean;
    onBack: () => void;
    onRegister: () => void;
    changeTextAreaHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    changeInputHandler:  (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CommentSatisfaction: React.FC<Props> = ({
    village,
    category,
    onBack,
    comment,
    isPublicComment,
    onRegister,
    changeTextAreaHandler,
    changeInputHandler
}) => {

    return (
        <div className=''>
            <div className='py-6 px-6 w-full text-center'>
                <div className='text-center mt-4'>
                    今回のビレッジに参加した感想などを<br />
                    ご自由にお書きください。
                </div>
                <div className='relative mt-4 w-full'>
                    <BaseTextArea
                        value={comment}
                        onChange={changeTextAreaHandler}
                        rows={8}
                    />
                </div>
                <div className='text-left mt-2'>
                    コメントを公開しても良い場合は<br />
                    以下にチェックしてください。
                </div>
                <div className='flex items-center mt-2'>
                    <FormCheckBox 
                        name="isPublicComment" 
                        id="isPublicComment" 
                        checked={isPublicComment}
                        onChange={changeInputHandler}
                    />
                    <FormLabel htmlFor={'isPublicComment'} _class={'ml-3 text-base'}>コメントを公開</FormLabel>
                </div>
            </div>
            <div className='px-10 mt-6'>
                <div className='flex justify-between'>
                    <div>
                        <MiddleButton onClick={onBack}>
                            戻る
                        </MiddleButton>
                    </div>
                    <div>
                        <MiddleButton onClick={onRegister}>
                            登録する
                        </MiddleButton>
                    </div>
                </div>
            </div>
        </div>
    )
}