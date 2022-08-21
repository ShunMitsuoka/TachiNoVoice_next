import { appConst } from '@/app/const/appConst';
import React, { useMemo } from 'react';
import { Village } from 'villageType';

export type roleComponentType = {
    host? : React.ReactNode,
    villageMember? : React.ReactNode,
    coreMember? : React.ReactNode,
    riseMember? : React.ReactNode,
    other? : React.ReactNode,
}

export type phaseComponentType = {
    recruitmentOfMember? : roleComponentType,
    drawingCoreMember? : roleComponentType,
    askingOpinionsOfCoreMember? : roleComponentType,
    categorizeOpinions? : roleComponentType,
    askingOpinionsOfRiseMember? : roleComponentType,
    evaluation? : roleComponentType,
    decidingPolicy? : roleComponentType,
    surveyingSatisfaction? : roleComponentType,
    other? : roleComponentType,
}

export const usePhaseComponent = (village: Village) => {

    const roleComponent = (roleComponent :roleComponentType) : React.ReactNode => {
        let component = null;
        if(roleComponent.other){
            component = roleComponent.other;
        }
        switch (village.role_id) {
            case appConst.member.role.host:
                if(roleComponent.host){
                    component = roleComponent.host;
                }
                break;
            case appConst.member.role.villageMember:
                if(roleComponent.villageMember){
                    component = roleComponent.villageMember;
                }
                break;
            case appConst.member.role.coreMember:
                if(roleComponent.coreMember){
                    component = roleComponent.coreMember;
                }
                break;
            case appConst.member.role.riseMember:
                if(roleComponent.riseMember){
                    component = roleComponent.riseMember;
                }
                break;
            default:
                break;
        }
        return component;
    };

    const phaseComponent = (phaseComponent: phaseComponentType) : React.ReactNode => {
        let target : roleComponentType = {};
        if(phaseComponent.other){
            target = phaseComponent.other;
        }
        switch (village.phase_no) {
            case appConst.village.phase.recruitmentOfMember:
                if(phaseComponent.recruitmentOfMember){
                    target = phaseComponent.recruitmentOfMember;
                }
                break;
            case appConst.village.phase.drawingCoreMember:
                if(phaseComponent.drawingCoreMember){
                    target = phaseComponent.drawingCoreMember;
                }
                break;
            case appConst.village.phase.askingOpinionsOfCoreMember:
                if(phaseComponent.askingOpinionsOfCoreMember){
                    target = phaseComponent.askingOpinionsOfCoreMember;
                }
                break;
            case appConst.village.phase.categorizeOpinions:
                if(phaseComponent.categorizeOpinions){
                    target = phaseComponent.categorizeOpinions;
                }
                break;
            case appConst.village.phase.askingOpinionsOfRiseMember:
                if(phaseComponent.askingOpinionsOfRiseMember){
                    target = phaseComponent.askingOpinionsOfRiseMember;
                }
                break;
            case appConst.village.phase.evaluation:
                if(phaseComponent.evaluation){
                    target = phaseComponent.evaluation;
                }
                break;
            case appConst.village.phase.decidingPolicy:
                if(phaseComponent.decidingPolicy){
                    target = phaseComponent.decidingPolicy;
                }
                break;
            case appConst.village.phase.surveyingSatisfaction:
                if(phaseComponent.surveyingSatisfaction){
                    target = phaseComponent.surveyingSatisfaction;
                }
                break;
            default:
                break;
        }
        return roleComponent(target);
    };

    return { roleComponent, phaseComponent};
}
