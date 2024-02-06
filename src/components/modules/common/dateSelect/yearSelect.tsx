import { FormSelect } from '@/components/atoms/select/formSelect';
import React, { useEffect, useMemo } from 'react';

interface Props {
    name: string;
    id: string;
    value?: string;
    defaultValue?: string;
    _class?: string;
    onChange?: (e: any) => void;
}

export const YearSelect: React.FC<Props> = ({
    name,
    id,
    value,
    defaultValue = '',
    _class = '',
    onChange,
}) => {

    const contents = useMemo(() => {
        var currentTime = new Date();
        var year = currentTime.getFullYear();
        const options = [];
        for (let index = 1900; index <= year; index++) {
            options.push(
                <option key={index} value={index}>{index}</option>
            );
        }
        return options;
    }, []);

    useEffect(() => {
        if(value == ''){
            var currentTime = new Date();
            var year = currentTime.getFullYear();
            value = year.toString();
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