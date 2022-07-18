import { FormSelect } from '@/components/atoms/select/formSelect';
import React, { useEffect, useMemo } from 'react';

interface Props {
    name: string;
    id: string;
    value?: string;
    _class?: string;
    onChange?: (e: any) => void;
}

export const MonthSelect: React.FC<Props> = ({
    name,
    id,
    value,
    _class = '',
    onChange,
}) => {

    const contents = useMemo(() => {
        const options = [];
        for (let index = 1; index <= 12; index++) {
            options.push(
                <option key={index} value={index}>{index}</option>
            );
        }
        return options;
    }, []);

    useEffect(() => {
        if(value == ''){
            var currentTime = new Date();
            var month = currentTime.getMonth();
            value = month.toString();
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