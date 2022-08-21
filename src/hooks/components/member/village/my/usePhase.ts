import { appConst } from '@/app/const/appConst';
import { useMemo } from 'react';
import { Village } from 'villageType';

export const usePhase = (phaseId: number, village: Village) => {

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
        return village.phase_no == phaseId
    }, [village]);

    const isPreparing : boolean = useMemo(() => {
        return village.is_phase_preparing && village.phase_no == phaseId
    }, [village]);

    return { title, isActive, isPreparing };
}
