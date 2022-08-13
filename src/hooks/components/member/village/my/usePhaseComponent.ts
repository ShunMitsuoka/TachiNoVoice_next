import { appConst } from '@/app/const/appConst';
import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import axios from '@/libs/axios/axios';
import { useSession } from 'next-auth/react';
import React, { useMemo } from 'react';
import { Village } from 'villageType';

export type roleComponentType = {
    host : React.ReactNode,
    villageMember : React.ReactNode,
    coreMember : React.ReactNode,
    riseMember : React.ReactNode,
}

export const usePhaseComponent = (phaseId: number, village: Village) => {

  const { data: session, status } = useSession();

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

    const startPhase = () => {
        axios.post(ApiService.getFullURL(
            RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.phase.start, {'id' : village.village_id})
        ), {}, ApiService.getAuthHeader(session))
        .then((response) => {
            const res = ApiService.makeApiResponse(response);
            if(res.getSuccess()){
                console.log(res);
            }else{
                alert('失敗');
            }
        });
    }

    return { title, isActive, isPreparing, roleComponent, startPhase};
}
