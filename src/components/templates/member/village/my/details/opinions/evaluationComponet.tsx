import { appConst } from '@/app/const/appConst';
import { RouteManager } from '@/app/manages/routeManager';
import { ApiService } from '@/app/services/apiService';
import { usePageLoading } from '@/hooks/common/usePageLoading';
import axios from '@/libs/axios/axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { RiThumbUpFill } from "react-icons/ri";
import { RiThumbDownFill } from "react-icons/ri";
import { RiQuestionFill } from "react-icons/ri";
import { MemberDetail, Opinion } from 'villageType';

interface Props {
    villageId: Number;
    opinion_id : number;
    mySelfEvaluation?: number;
    reload: () => void;
}

export const EvaluationComponet: React.FC<Props> = ({
    villageId,
    opinion_id,
    mySelfEvaluation,
    reload,
}) => {
    const { data: session, status } = useSession();
    const pageLoading = usePageLoading();

    const onClick = (value: number) => {
        pageLoading.show();
        axios.post(ApiService.getFullURL(
            RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.evaluation, { 'id': villageId })
        ), {
            opinion_id: opinion_id,
            value: value,
        }, ApiService.getAuthHeader(session))
        .then((response) => {
            const res = ApiService.makeApiResponse(response);
            if (res.getSuccess()) {
                reload();
            } else {
                pageLoading.close();
                alert('失敗')
            }
        })
        .catch(pageLoading.close);
    }

    return (
        <>
            <div className="grid grid-cols-3 mt-4 py-1">
                <div className="col-span-1 flex justify-center items-center">
                    <div
                        className={"flex justify-center items-center w-16 h-16 rounded-full drop-shadow-lg cursor-pointer " + (mySelfEvaluation == appConst.village.evaluation.good ? 'bg-rise' : 'bg-white')}
                        onClick={() => onClick(appConst.village.evaluation.good)}
                    >
                        <RiThumbUpFill className="text-sub text-3xl" />
                    </div>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    <div
                        className={"flex justify-center items-center w-16 h-16 rounded-full drop-shadow-lg cursor-pointer " + (mySelfEvaluation == appConst.village.evaluation.bad ? 'bg-rise' : 'bg-white')}
                        onClick={() => onClick(appConst.village.evaluation.bad)}
                    >
                        <RiThumbDownFill className="text-sub text-3xl" />
                    </div>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    <div
                        className={"flex justify-center items-center w-16 h-16 rounded-full drop-shadow-lg cursor-pointer " + (mySelfEvaluation == appConst.village.evaluation.uncertain ? 'bg-rise' : 'bg-white')}
                        onClick={() => onClick(appConst.village.evaluation.uncertain)}
                    >
                        <RiQuestionFill className="text-sub text-3xl" />
                    </div>
                </div>
            </div>
        </>
    )
}