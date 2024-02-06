import { RouteManager } from '@/app/manages/routeManager';
import { LinkButton } from '@/components/atoms/buttons/linkButton';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { usePhase } from '@/hooks/components/member/village/my/usePhase';
import { usePhaseComponent } from '@/hooks/components/member/village/my/usePhaseComponent';
import { useVillageMethod } from '@/hooks/components/member/village/my/useVillageMethod';
import React, { useMemo } from 'react';
import { Village } from 'villageType';
import { PhaseComponent } from '../phaseComponent';

interface Props {
    phaseNo: number,
    village: Village,
    setVillageDetails: (village_id: string | number) => void
}

export const AskingOpinionsOfCoreMember: React.FC<Props> = ({
    phaseNo,
    village,
    setVillageDetails
}) => {

    const phaseHook = usePhase(phaseNo, village);
    const phaseComponet = usePhaseComponent(village);
    const villageMethod = useVillageMethod(village, setVillageDetails);

    const preparingComponet = () => {
        let component = null;
        if (village.is_necessary_to_set_phase_setting && village.is_necessary_to_set_phase_end_setting && !village.exists_phase_end_setting) {
            component = (
                <LinkButton href={RouteManager.webRoute.member.village.my.details.phaseSetting + village.village_id}>
                    終了条件設定
                </LinkButton>
            );
        } else {
            component = (
                <MiddleButton onClick={villageMethod.startPhase}>
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
                    <LinkButton href={RouteManager.webRoute.member.village.my.details.opinions + village.village_id}>
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
                        意見募集の開始まで<br />
                        しばらくお待ちください。
                    </div>
                    :
                    <>
                        { village.is_task_done ?
                            <div className='text-xl'>意見済み</div>
                        :
                            <LinkButton href={RouteManager.webRoute.member.village.my.details.coreMemberOpinion + village.village_id}>
                                意見募集
                            </LinkButton>
                        }
                    </>

            }
        </>
    );

    const riseMemberComponent = (
        <div>
            コアメンバー意見募集中です<br />
            しらばらくお待ちください。
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
                {phaseComponet.roleComponent(roleComponent)}
            </div>
        </PhaseComponent>
    )
}