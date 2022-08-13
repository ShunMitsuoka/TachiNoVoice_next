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

export const AskingOpinionsOfCoreMember: React.FC<Props> = ({
    phaseNo,
    village
}) => {

    const phaseHook = usePhaseComponent(phaseNo, village);

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

    const coreMemberComponent = (
        <>
            {
                phaseHook.isPreparing ? 
                <div>
                    コアメンバー意見募集まで<br />
                    しばらくお待ちください。
                </div>
                :
                <div>意見募集</div>
            }
        </>
    );

    const riseMemberComponent = (
        <div>
            コアメンバー意見募集まで<br />
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
        >
            <div>
                {phaseHook.roleComponent(roleComponent)}
            </div>
        </PhaseComponent>
    )
}