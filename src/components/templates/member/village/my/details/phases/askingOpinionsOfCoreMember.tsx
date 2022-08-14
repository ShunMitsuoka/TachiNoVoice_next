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

    const preparingComponet = () => {
        let component = null;
        if (!village.exists_phase_end_setting) {
            component = (
                <LinkButton href={RouteManager.webRoute.member.village.my.details.phaseSetting + village.village_id}>
                    終了条件設定
                </LinkButton>
            );
        } else {
            component = (
                <MiddleButton onClick={phaseHook.startPhase}>
                    開始する
                </MiddleButton>
            );
        }
        return component;
    }

    const hostComponent = (
        <>
            {
                phaseHook.isPreparing ?
                    preparingComponet()
                    :
                    <LinkButton href={RouteManager.webRoute.member.village.my.details.phaseSetting + village.village_id}>
                        意見確認
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
                    <LinkButton href={RouteManager.webRoute.member.village.my.details.coreMemberOpinion + village.village_id}>
                        意見募集
                    </LinkButton>
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
        villageMember: null,
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