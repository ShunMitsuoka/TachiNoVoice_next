import React from 'react';
import { Village } from 'villageType';

interface Props {
    village: Village;
    _class?: string;
}

export const VillageTitle: React.FC<Props> = ({
    village,
    _class
}) => {
    return (
        <div className={'text-center text-xl font-bold ' + _class}>
            {village.title}
        </div >
    );
}