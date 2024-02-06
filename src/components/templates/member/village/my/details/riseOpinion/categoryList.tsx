import { BaseButton } from '@/components/atoms/buttons/baseButton';
import React from 'react';
import { Category, MyOpinion, Village } from 'villageType';

interface Props {
    village: Village;
    categories: Category[];
    onClick: (category : Category) => void;
    myOpinions : MyOpinion[];
}

export const CategoryList: React.FC<Props> = ({
    village,
    categories,
    onClick,
    myOpinions
}) => {

    return (
        <div className=''>
            {
                categories.map((category, index) => {
                    let isDone = false;
                    for (let index = 0; index < myOpinions.length; index++) {
                        const myOpinion = myOpinions[index];
                        if(myOpinion.category_id == category.category_id){
                            isDone = true;
                            break;
                        }
                    }
                    return (
                        <div 
                            key={index} 
                            className={"mt-3 py-2 text-white " + (isDone ? 'bg-gray-400' : 'bg-rise')} 
                            >
                            <div className=' text-lg font-bold'>
                                {category.category_name}
                            </div>
                            {
                                isDone ?
                                <div className='mt-2'>
                                    <span className='px-2 py-1 border border-white rounded'>
                                    意見済み
                                    </span>
                                </div>
                                :
                                <div className='py-2'>
                                    <BaseButton onClick={() => {onClick(category)}}>
                                        意見する
                                    </BaseButton>
                                </div>
                            }
                        </div>
                    );
                })
            }
        </div>
    )
}