import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { usePhaseComponent } from '@/hooks/components/member/village/my/usePhaseComponent';
import React, { useMemo } from 'react';
import { Village } from 'villageType';
import { PhaseComponent } from '../phaseComponent';

interface Props {
    phaseNo: number,
    village: Village
}

export const Phase1: React.FC<Props> = ({
    phaseNo,
    village
}) => {

    const phaseHook = usePhaseComponent(phaseNo, village);

    const hostComponent = (
        <>
            {
                phaseHook.isPreparing ?
                    <MiddleButton onClick={phaseHook.startPhase}>
                        開始
                    </MiddleButton>
                : 
                <LinkButton href={RouteManager.webRoute.member.village.my.details.members + village.village_id}>
                        確認する
                </LinkButton>
            }
        </>
    );

    const villageMemberComponent = (
        <div>
            メンバー募集中です。<br />
            メンバー抽選まで<br />
            しばらくお待ちください。
        </div>
    );

    const coreMemberComponent = (
        <div>
            メンバー募集中です。<br />
            メンバー抽選まで<br />
            しばらくお待ちください。
        </div>
    );

    const riseMemberComponent = (
        <div>
            メンバー募集中です。<br />
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
                {phaseHook.roleComponent(roleComponent)}
            </div>
        </PhaseComponent>
    )
}