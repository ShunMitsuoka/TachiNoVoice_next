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
    setVillage: React.Dispatch<React.SetStateAction<Village>>
}

export const Satisfaction: React.FC<Props> = ({
    phaseNo,
    village,
    setVillage
}) => {

    const phaseHook = usePhase(phaseNo, village);
    const phaseComponet = usePhaseComponent(village);
    const villageMethod = useVillageMethod(village, setVillage);

    const hostComponent = (
        <>
            {
                phaseHook.isPreparing ?
                    <MiddleButton onClick={villageMethod.startPhase}>
                        開始
                    </MiddleButton>
                : 
                <LinkButton href={RouteManager.webRoute.member.village.my.details.satisfaction.result + village.village_id}>
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
                        満足度フェーズ開始まで<br />
                        しばらくお待ちください。
                    </div>
                    :
                    <>
                        { village.is_task_done ?
                            <LinkButton href={RouteManager.webRoute.member.village.my.details.satisfaction.result + village.village_id}>
                                結果を見る
                            </LinkButton>
                        :
                            <LinkButton href={RouteManager.webRoute.member.village.my.details.satisfaction.index + village.village_id}>
                                登録する
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