import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import { usePageLoading } from '@/hooks/common/usePageLoading';
import axios from '@/libs/axios/axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Village } from 'villageType';

export const useVillage = () => {
    const [village, setVillage] = useState<Village>();
    const { data: session, status } = useSession();

    const setVillageDetails = (village_id : number|string) => {
        setVillage(undefined);
        axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.my.details)+village_id, ApiService.getAuthHeader(session))
        .then(function (response) {
            const res = ApiService.makeApiResponse(response);
            if(res.getSuccess()){
              console.log(res);
              setVillage(res.getResult());
            }else{
                alert('失敗');
            }
        });
    }

    const isInitializedVillage = () => {
        if(village == undefined){
            return false;
        }
        return true;
    }

    /**
     * ビレッジが読み込まれた表示したいコンポーネントを設定する
     * @param component 
     * @returns 
     */
    const villageComponent = (component : React.ReactNode) => {
        return (
            <>
            {
                isInitializedVillage() && component
            }
            </>
        )
    }

    return { village, setVillage, setVillageDetails, isInitializedVillage, villageComponent};
}
