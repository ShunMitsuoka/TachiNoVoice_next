import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import React from 'react';
import { Category, Village } from 'villageType';
import { OpinionCard } from '../opinions/opinionCard';

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
            <div className='px-8 mt-6'>
                <div className="flex items-end w-full">
                    <div className="w-8 h-8 bg-sub"></div>
                    <div className="flex-1 px-2 border-b border-b-sub text-sub text-lg">意見</div>
                </div>
                <div className='mt-4'>
                  <img src={process.env.NEXT_PUBLIC_API_URL+'storage/village/'+village.village_id+'/'+category.category_id+'/member_opinion.png'} alt="" />
                </div>
                { 
                    category?.opinions?.map((opinion, index) => {
                        return (
                            <div key={index} className="mt-4">
                                <OpinionCard
                                    opinion={opinion} 
                                    villageId={village.village_id} 
                                    isShowEvaluation={true}
                                />
                            </div>
                        );
                    })
                }
            </div>

        </div>
    )
}