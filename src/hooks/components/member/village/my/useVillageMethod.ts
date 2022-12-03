import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import { usePageLoading } from '@/hooks/common/usePageLoading';
import axios from '@/libs/axios/axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Village } from 'villageType';



export const useVillageMethod = (village: Village | undefined, setVillageDetails : (village_id: number | string) => void) => {

    const { data: session, status } = useSession();
    const pageLoading = usePageLoading();

    const nextPhase = (callbackFunc? : Function) => {
        if(village == undefined){
            alert('ビレッジが読み込まれていません')
            return;
        }
        pageLoading.show();
        axios.post(ApiService.getFullURL(
            RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.phase.next, { 'id': village.village_id })
        ), {}, ApiService.getAuthHeader(session))
        .then((response) => {
            const res = ApiService.makeApiResponse(response);
            if (res.getSuccess()) {
                setVillageDetails(village.village_id);
            }
        })
        .finally(() => {
            setVillageDetails(village.village_id);
            if(callbackFunc && typeof callbackFunc === 'function'){
                callbackFunc()
            };
        });
    }

    const startPhase = (callbackFunc? : Function) => {
        if(village == undefined){
            alert('ビレッジが読み込まれていません')
            return;
        }
        pageLoading.show();
        axios.post(ApiService.getFullURL(
            RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.phase.start, { 'id': village.village_id })
        ), {}, ApiService.getAuthHeader(session))
        .then((response) => {
            const res = ApiService.makeApiResponse(response);
            if (res.getSuccess()) {
                setVillageDetails(village.village_id);
                
            }
        })
        .finally(() => {
            setVillageDetails(village.village_id);
            if(callbackFunc && typeof callbackFunc === 'function'){
                callbackFunc()
            };
        });
        
    }

    return { nextPhase, startPhase};
}
