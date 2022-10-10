import { LinkButton } from '@/components/atoms/buttons/linkButton';
import React from 'react';

interface Props {
    onClickVillageList: () => void;
}

export const CompleteRegisterVillage: React.FC<Props> = ({
    onClickVillageList,
}) => {
    return (
        <div className='text-center' onClick={onClickVillageList}>
            <p className='text-xl'>ビレッジの作成が完了しました。</p>
            <div className='mt-6'>
                <LinkButton href={''}>
                    ビレッジ一覧へ
                </LinkButton>
            </div>
        </div>
    )
}