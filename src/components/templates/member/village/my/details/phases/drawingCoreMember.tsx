import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { usePhase } from '@/hooks/components/member/village/my/usePhase';
import { usePhaseComponent } from '@/hooks/components/member/village/my/usePhaseComponent';
import React, { useMemo } from 'react';
import { Village } from 'villageType';
import { PhaseComponent } from '../phaseComponent';

interface Props {
    phaseNo: number,
    village: Village,
}

export const DrawingCoreMember: React.FC<Props> = ({
    phaseNo,
    village
}) => {

    const phaseHook = usePhase(phaseNo, village);
    const phaseComponet = usePhaseComponent(village);

    const hostComponent = (
        <>
            {
                phaseHook.isPreparing &&
                    <LinkButton href={RouteManager.webRoute.member.village.my.details.members + village.village_id}>
                        確認する
                    </LinkButton>
            }
        </>
    );

    const villageMemberComponent = (
        <div>
            メンバー抽選まで<br />
            しばらくお待ちください。
        </div>
    );

    const coreMemberComponent = (
        <div>
            メンバー抽選まで<br />
            しばらくお待ちください。
        </div>
    );

    const riseMemberComponent = (
        <div>
            メンバー抽選まで<br />
            しばらくお待ちください。
        </div>
    );

    const roleComponent = useMemo(() => ({
        host: hostComponent,
        villageMember: villageMemberComponent,
        coreMember: coreMemberComponent,
        riseMember: riseMemberComponent
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