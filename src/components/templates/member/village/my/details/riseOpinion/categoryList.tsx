import React from 'react';
import { Category, Village } from 'villageType';

interface Props {
    village: Village;
    categories: Category[];
    onClick: (category : Category) => void;
}

export const CategoryList: React.FC<Props> = ({
    village,
    categories,
    onClick
}) => {

    return (
        <div className=''>
            {
                categories.map((category, index) => {
                    return (
                        <div key={index} className="mt-3 py-2 bg-rise cursor-pointer" onClick={() => onClick(category)}>
                            {category.category_name}
                        </div>
                    );
                })
            }
        </div>
    )
}