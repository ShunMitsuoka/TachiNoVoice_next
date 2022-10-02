import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import React from 'react';
import { Category, Village } from 'villageType';

interface Props {
    village: Village;
    category : Category;
    comment : string;
    onBack: () => void;
    onRegister: () => void;
    changeTextAreaHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CommentSatisfaction: React.FC<Props> = ({
    village,
    category,
    onBack,
    comment,
    onRegister,
    changeTextAreaHandler
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