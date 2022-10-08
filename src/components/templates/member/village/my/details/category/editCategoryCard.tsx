import { BaseButton } from '@/components/atoms/buttons/baseButton';
import { FormInput } from '@/components/atoms/input/formInput';
import { GenderIcon } from '@/components/modules/common/gender/gender';
import { ValidationErrors } from '@/components/modules/common/validation/validationErrors';
import { useValidationError } from '@/hooks/common/useValidationError';
import React, { useState } from 'react';
import { Category, MemberDetail } from 'villageType';

interface Props {
    villageId: Number;
    category: Category;
    validationError:any;
    update:(categoryId: number, categoryName: string) => Promise<void>
    deleteCategory: (categoryId: number) => Promise<void>
}

export const EditCategoryCard: React.FC<Props> = ({
    villageId,
    category,
    validationError,
    update,
    deleteCategory,
}) => {
    const [categoryName, setCategoryName] = useState<string>(category.category_name);

    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.value;
        setCategoryName(value);
      }

    return (
        <div className='px-6 py-6'>
            <div className='py-4 text-center text-xl'>
                カテゴリー編集
            </div>
            <div>
            <FormInput
                id='editCategory'
                name='editCategory'
                value={categoryName}
                onChange={changeInputHandler}
            />
            <ValidationErrors validationErrors={validationError.errors} id={'editCategory'}/>
            <div className='flex justify-between mt-6'>
                <BaseButton _class='bg-rose-500' onClick={() => deleteCategory(category.category_id!)}>
                    削除
                </BaseButton>
                <BaseButton onClick={() => update(category.category_id!, categoryName)}>
                    変更
                </BaseButton>
            </div>
            </div>
        </div>
    )
}