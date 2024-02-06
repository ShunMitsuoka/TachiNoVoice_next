import { FormSelect } from '@/components/atoms/select/formSelect';
import React, { useEffect, useMemo } from 'react';

interface Props {
    year: string;
    month: string;
    name: string;
    id: string;
    value?: string;
    _class?: string;
    onChange?: (e: any) => void;
}

export const DateSelect: React.FC<Props> = ({
    year,
    month,
    name,
    id,
    value,
    _class = '',
    onChange,
}) => {

    const contents = useMemo(() => {
        const options = [];
        const date = new Date(Number(year), Number(month), 0).getDate();
        for (let index = 1; index <= date; index++) {
            options.push(
                <option key={index} value={index}>{index}</option>
            );
        }
        return options;
    }, [year, month]);

    useEffect(() => {
        if(value == ''){
            var currentTime = new Date();
            var date = currentTime.getDate();
            value = date.toString();
            if(onChange){
                onChange({
                    target : {
                        name : name,
                        value : value,
                    }
                })
            }
        }
    }, []);

    return (
        <>
            <FormSelect
                name={name} 
                id={id} 
                value={value} 
                onChange={onChange}
                _class={_class + ' text-right'}
            >
                {contents}
            </FormSelect>
        </>
    );
}