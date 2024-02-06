import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import React, { useEffect, useState } from 'react';
import { Category, Satisfaction, Village } from 'villageType';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { PolicyCard } from '@/components/modules/member/village/policy/policyCard';

interface Props {
    village: Village;
    category : Category;
    onBack: () => void;
    onNext: () => void;
    satisfactions : Satisfaction[],
    setSatisfactions: React.Dispatch<React.SetStateAction<Satisfaction[]>>
}

const marks = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5'
};

export const DecidingSatisfaction: React.FC<Props> = ({
    village,
    category,
    onBack,
    onNext,
    satisfactions,
    setSatisfactions
}) => {

    const [satisfaction, setSatisfaction] = useState<Satisfaction>();

    useEffect(() => {
        const policyId = category.policy!.policy_id;
        for (let index = 0; index < satisfactions.length; index++) {
            const data = satisfactions[index];
            if(data.policy_id == policyId){
                setSatisfaction(data);
            }
        }
    }, [category, satisfactions]);

    useEffect(() => {
        console.log('satisfactionが更新されました')

        const policyId = category.policy!.policy_id;
        for (let index = 0; index < satisfactions.length; index++) {
            const satisf = satisfactions[index];
            if(satisf.policy_id == policyId && satisfaction){
                satisfactions[index] = satisfaction;
                console.log(satisfactions)
                setSatisfactions(satisfactions.slice());
            }
        }
    }, [satisfaction]);

    const onChange = (value : number | number[]) =>{
        const policyId = category.policy!.policy_id;
        setSatisfaction({
            policy_id : policyId,
            level : value as number
        });
    }

    return (
        <div className=''>
            <div className='px-6'>
                <PolicyCard category={category} />
            </div>
            {
                satisfaction && 
                <div className='px-10 mt-6'>
                    <div className='text-center'>
                        方針についての満足度を<br />
                        ５段階で評価してください。
                    </div>
                    <div className='flex mt-6 mb-10 w-full'>
                        <div>
                            低
                        </div>
                        <div className='flex-1 mx-5'>
                            <Slider 
                                min={1} 
                                max={5} 
                                value={satisfaction.level}
                                marks={marks} 
                                step={null} 
                                onChange={onChange}/>
                        </div>
                        <div>
                            高
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <MiddleButton onClick={onBack}>
                                戻る
                            </MiddleButton>
                        </div>
                        <div>
                            <MiddleButton onClick={onNext}>
                                次へ
                            </MiddleButton>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}