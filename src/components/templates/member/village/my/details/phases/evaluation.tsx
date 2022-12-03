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

export const Evaluation: React.FC<Props> = ({
    phaseNo,
    village,
    setVillageDetails
}) => {

    const phaseHook = usePhase(phaseNo, village);
    const phaseComponet = usePhaseComponent(village);
    const villageMethod = useVillageMethod(village, setVillageDetails);

    const hostComponent = (
        <>
            {
                phaseHook.isPreparing ?
                    <MiddleButton onClick={villageMethod.startPhase}>
                        開始
                    </MiddleButton>
                : 
                <LinkButton href={RouteManager.webRoute.member.village.my.details.opinions + village.village_id}>
                        確認する
                </LinkButton>
            }
        </>
    );

    const otherMemberComponent = (
        <>
            {
                phaseHook.isPreparing ?
                    <div>
                        ライズメンバー意見募集が終了しました<br />
                        評価フェーズ開始まで<br />
                        しばらくお待ちください。
                    </div>
                    :
                    <>
                        { village.is_task_done ?
                            <div className='text-xl'>評価済み</div>
                        :
                            <LinkButton href={RouteManager.webRoute.member.village.my.details.opinions + village.village_id}>
                                評価する
                            </LinkButton>
                        }
                    </>

            }
        </>
    );

    const roleComponent = useMemo(() => ({
        host: hostComponent,
        other: otherMemberComponent,
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