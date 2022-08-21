import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import { usePageLoading } from '@/hooks/common/usePageLoading';
import axios from '@/libs/axios/axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Village } from 'villageType';



export const useVillageMethod = (village: Village, setVillage : React.Dispatch<React.SetStateAction<Village>>) => {

    const { data: session, status } = useSession();
    const pageLoading = usePageLoading();

    const setVillageDetails = (village_id : number|string) => {
        pageLoading.show();
        axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.my.details)+village_id, ApiService.getAuthHeader(session))
        .then(function (response) {
            const res = ApiService.makeApiResponse(response);
            if(res.getSuccess()){
              console.log(res);
              setVillage(res.getResult());
            }else{
                alert('失敗');
            }
        })
        .finally(pageLoading.close);
    }

    const nextPhase = () => {
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
        .finally(() => setVillageDetails(village.village_id));
    }

    const startPhase = () => {
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
        .finally(() => setVillageDetails(village.village_id));
    }

    return { setVillageDetails, nextPhase, startPhase};
}
