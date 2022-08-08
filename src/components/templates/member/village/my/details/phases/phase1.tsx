import { appConst } from '@/app/const/appConst';
import { MiddleButton } from '@/components/atoms/buttons/middleButton';
import { roleComponentType, usePhaseComponent } from '@/hooks/components/member/village/my/usePhaseComponent';
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

    const phaseHook = usePhaseComponent(phaseId, village);

    const hostComponent = (
        <>
            {
                phaseHook.isPreparing ?
                    <MiddleButton onClick={phaseHook.startPhase}>
                        開始
                    </MiddleButton>
                : 
                <MiddleButton>
                        確認する
                </MiddleButton>
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
        <>コアメンバー</>
    );

    const riseMemberComponent = (
        <>ライズメンバー</>
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