import { appConst } from '@/app/const/appConst';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { BaseTextArea } from '@/components/atoms/textarea/baseTextArea';
import React, { useEffect, useState } from 'react';
import { Category, Opinion, Village } from 'villageType';
import { OpinionCard } from '../opinions/opinionCard';

interface Props {
    village: Village;
    category : Category;
    onBack: () => void;
    onRegister: () => void;
    policy: string;
    changeTextAreaHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

type sortDataType = {
    opinion : Opinion,
    good : number,
    bad : number,
}

export const RegisterPolicy: React.FC<Props> = ({
    village,
    category,
    onBack,
    onRegister,
    policy,
    changeTextAreaHandler
}) => {

    const [opinions, setOpinions] = useState<Opinion[]>(category?.opinions!);
    const [order, setOrder] = React.useState(appConst.village.evaluation.good);

    useEffect(() => {
        let sortData:sortDataType[] = [];
        opinions.map(opinion => {
            let good = 0;
            let bad = 0;
            let evaluations = opinion.evaluations;
            if(evaluations){
                evaluations.map(evaluation => {
                    switch (evaluation.value) {
                        case appConst.village.evaluation.good:
                            good += 1;
                            break;
                        case appConst.village.evaluation.bad:
                            bad += 1;
                            break;
                        default:
                            break;
                    }
                })
            }
            sortData.push({
                opinion : opinion,
                good : good,
                bad : bad,
            })
        })
    
        sortData.sort((a, b) => {
            if(order == appConst.village.evaluation.good){
                return a.good < b.good ? 1 : -1;
            }
            if(order == appConst.village.evaluation.bad){
                return a.bad < b.bad ? 1 : -1;
            }
            return 1;
        });
    
        let sortedOpinions:Opinion[] = [];
        sortData.map(data => {
            sortedOpinions.push(data.opinion);
        });
        setOpinions(sortedOpinions);
      }, [order]);

      const handleChange = (e:any) => {
        setOrder(e.target.value);
      };


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
                <div className='flex items-center mt-2'>
                    <div>
                        【降順】
                    </div>
                    <div>
                        <input
                            type="radio"
                            id='good'
                            value={appConst.village.evaluation.good}
                            onChange={handleChange}
                            checked={order == appConst.village.evaluation.good}
                        />
                        <label htmlFor={'good'} className="ml-1">good</label>
                    </div>
                    <div className='ml-2'>
                        <input
                            type="radio"
                            id='bad'
                            value={appConst.village.evaluation.bad}
                            onChange={handleChange}
                            checked={order == appConst.village.evaluation.bad}
                        />
                        <label htmlFor={'bad'} className="ml-1">bad</label>
                    </div>
                </div>
                { 
                    opinions.map((opinion, index) => {
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