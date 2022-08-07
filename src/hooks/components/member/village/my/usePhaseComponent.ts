import { appConst } from '@/app/const/appConst';
import { myVillageType } from '@/pages/member/village/my/details/[id]';
import React, { useMemo } from 'react';

export type roleComponentType = {
    host : React.ReactNode,
    villageMember : React.ReactNode,
    coreMember : React.ReactNode,
    riseMember : React.ReactNode,
}

export const usePhaseComponent = (phaseId: number, village: myVillageType) => {

    const title: string = useMemo(() => {
        let result = '';
        switch (phaseId) {
            case appConst.village.phase.recruitmentOfMember:
                result = 'ビレッジメンバー募集';
                break;
            case appConst.village.phase.drawingCoreMember:
                result = 'メンバー抽選';
                break;
            case appConst.village.phase.askingOpinionsOfCoreMember:
                result = 'コアメンバー意見募集';
                break;
            case appConst.village.phase.categorizeOpinions:
                result = 'カテゴリー分け';
                break;
            case appConst.village.phase.askingOpinionsOfRiseMember:
                result = 'ライズメンバー意見募集';
                break;
            case appConst.village.phase.evaluation:
                result = '評価';
                break;
            case appConst.village.phase.decidingPolicy:
                result = '方針決定';
                break;
            case appConst.village.phase.surveyingSatisfaction:
                result = '満足度調査';
                break;
            default:
                break;
        }
        return result;
    }, []);

    const isActive: boolean = useMemo(() => {
        return village.phase == phaseId
    }, [village]);

    const isPreparing : boolean = useMemo(() => {
        return village.is_phase_preparing && village.phase == phaseId
    }, [village]);

    const roleComponent = (roleComponent :roleComponentType) => {
        let component = null;
        if(!isActive){
            return null;
        }
        switch (village.role_id) {
            case appConst.member.role.host:
                component = roleComponent.host;
                break;
            case appConst.member.role.villageMember:
                component = roleComponent.villageMember;
                break;
            case appConst.member.role.coreMember:
                component = roleComponent.coreMember;
                break;
            case appConst.member.role.riseMember:
                component = roleComponent.riseMember;
                break;
            default:
                break;
        }
        return component;
    };

    return { title, isActive, isPreparing, roleComponent};
}
