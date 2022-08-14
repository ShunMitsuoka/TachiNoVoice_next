import { appConst } from '@/app/const/appConst';
import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import axios from '@/libs/axios/axios';
import { useSession } from 'next-auth/react';
import React, { useMemo, useState } from 'react';
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

export const useVillage = () => {

    const { data: session, status } = useSession();

    const [village, setVillage] = useState<Village>({
        village_id : 0,
        title : '',
        phase_no : 0,
        phase_name : '',
        content : '',
        note : '',
        requirement : '',
        role_id : 0,
        village_member_limit : 0,
        village_member_count : 0,
        is_phase_preparing : false,
        exists_phase_end_setting : false,
        exists_phase_start_setting : false,
        exists_phase_setting : false,
        is_necessary_to_set_phase_end_setting : false,
        is_necessary_to_set_phase_setting : false,
        is_necessary_to_set_phase_start_setting : false,
    });

    const isPreparing: boolean = useMemo(() => {
        return village.is_phase_preparing
    }, [village]);

    const phaseComponent = (phaseComponent: phaseComponentType) => {
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

    const roleComponent = (roleComponent: roleComponentType) : React.ReactNode => {
        let component = null;
        if(roleComponent.other){
            component = roleComponent.other;
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

    const nextPhase = () => {
        axios.post(ApiService.getFullURL(
            RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.phase.next, { 'id': village.village_id })
        ), {}, ApiService.getAuthHeader(session))
        .then((response) => {
            const res = ApiService.makeApiResponse(response);
            if (res.getSuccess()) {
                console.log(res);
            } else {
                alert('失敗');
            }
        });
    }

    const startPhase = () => {
        axios.post(ApiService.getFullURL(
            RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.phase.start, { 'id': village.village_id })
        ), {}, ApiService.getAuthHeader(session))
            .then((response) => {
                const res = ApiService.makeApiResponse(response);
                if (res.getSuccess()) {
                    console.log(res);
                } else {
                    alert('失敗');
                }
            });
    }

    return { village, setVillage, isPreparing, phaseComponent, nextPhase, startPhase };
}
