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
                        <div key={index} className={"mt-3 py-2 cursor-pointer text-white " + (isDone ? 'bg-gray-400' : 'bg-rise')} onClick={() => onClick(category)}>
                            {category.category_name}
                        </div>
                    );
                })
            }
        </div>
    )
}