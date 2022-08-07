import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { usePhaseComponent } from '@/hooks/components/member/village/my/usePhaseComponent';
import { myVillageType } from '@/pages/member/village/my/details/[id]';
import React, { useMemo } from 'react';
import { PhaseComponent } from '../phaseComponent';

interface Props {
    phaseId: number,
    village: myVillageType
}

export const Phase1: React.FC<Props> = ({
    phaseId,
    village
}) => {

    const phaseComponentHook = usePhaseComponent(phaseId, village);

    return (
        <PhaseComponent
            title={phaseComponentHook.title}
            isActive={phaseComponentHook.isActive}
        >
            aaaa
        </PhaseComponent>
    )
}