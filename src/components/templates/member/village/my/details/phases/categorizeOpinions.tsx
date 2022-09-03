import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { usePhase } from '@/hooks/components/member/village/my/usePhase';
import { roleComponentType, usePhaseComponent } from '@/hooks/components/member/village/my/usePhaseComponent';
import React, { useMemo } from 'react';
import { Village } from 'villageType';
import { PhaseComponent } from '../phaseComponent';

interface Props {
    phaseNo: number,
    village: Village,
    setVillage: React.Dispatch<React.SetStateAction<Village>>
}

export const CategorizeOpinions: React.FC<Props> = ({
    phaseNo,
    village
}) => {

    const phaseHook = usePhase(phaseNo, village);
    const phaseComponet = usePhaseComponent(village);

    const hostComponent = (
        <>
            <LinkButton href={RouteManager.webRoute.member.village.my.details.opinions + village.village_id}>
                カテゴリー分け
            </LinkButton>
        </>
    );

    const otherComponent = (
        <div>
            ホストが意見カテゴリー分け中です<br />
            しばらくお待ちください。
        </div>
    );

    const roleComponent :roleComponentType = useMemo(() => ({
        host: hostComponent,
        other : otherComponent
    }), [village]);

    return (
        <PhaseComponent
            title={phaseHook.title}
            isActive={phaseHook.isActive}
            village={village}
        >
            <div>
                {phaseComponet.roleComponent(roleComponent)}
            </div>
        </PhaseComponent>
    )
}