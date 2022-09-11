import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { MiddleButton } from "@/components/atoms/buttons/middleButton";
import { VillageTitle } from "@/components/modules/member/village/villageTitle";
import { FormInput } from '@/components/atoms/input/formInput';
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Category, MemberDetail } from "villageType";
import { LinkButton } from "@/components/atoms/buttons/linkButton";

interface Opinion {
    categoryId?: number,
    opinionId: number,
    opinion: string,
    member: MemberDetail,
}

const MyVillageCategory: NextPage = () => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const { id } = router.query;
    const pageLoading = usePageLoading();
    const villageState = useVillage();
    const [categories, setCategories] = useState<Category[]>([]);

    const [opinions, setOpinions] = useState<Opinion[]>([]);
    const [opinionIndex, setOpinionIndex] = useState<number>(0);

    useEffect(() => {
        if (status === "authenticated") {
            reload();
        }
    }, [status]);

    useEffect(() => {
        let opinions: Opinion[] = [];
        categories.map((category, index) => {
            if (category.opinions) {
                category.opinions.map((opinion) => {
                    opinions.push({
                        categoryId: category.category_id,
                        opinionId: opinion.opinion_id,
                        opinion: opinion.opinion,
                        member: opinion.member,
                    });
                });
            }
        });
        setOpinions(opinions);
    }, [categories]);

    const setCategory = async (categoryId: number) => {
        pageLoading.show();
        await axios.post(ApiService.getFullURL(
          RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.opinion.setCategory, { 'id': villageState.village.village_id })
        ), {
            categoryId: categoryId,
            opinionId: opinions[opinionIndex].opinionId,
            userId: opinions[opinionIndex].member.user_id,
        }, ApiService.getAuthHeader(session))
        .then((response) => {
          const res = ApiService.makeApiResponse(response);
          if(res.getSuccess()){

          }
        })
        .finally(pageLoading.close);
        reload();
    }

    const reload = () => {
        pageLoading.show();
        axios.get(ApiService.getFullURL(
            RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.opinion.index, { 'id': id })
        ), ApiService.getAuthHeader(session))
            .then((response) => {
                const res = ApiService.makeApiResponse(response);
                console.log(res);
                if (res.getSuccess()) {
                    villageState.setVillage(res.getResult());
                    setCategories(response.data.result.categories);
                } else {
                    alert('失敗');
                }
            })
            .finally(pageLoading.close);
    }

    const prevOpinion = () => {
        if(opinionIndex-1 < 0){
            setOpinionIndex(opinions.length-1);

        }else{
            setOpinionIndex(opinionIndex-1);
        }
    }

    const nextOpinion = () => {
        if(opinionIndex+1 > opinions.length-1){
            setOpinionIndex(0);

        }else{
            setOpinionIndex(opinionIndex+1);
        }
    }

    return (
        <_BaseMemberLayout>
            <PhaseDetailsHeader village={villageState.village} menuType={"opinion"} />
            <VillageTitle village={villageState.village} _class='my-8' />
            <div className="px-8">
                <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-8 h-8 bg-sub rounded-full text-white text-lg font-bold" onClick={prevOpinion}>
                        {'<'}
                    </div>
                    <div className="flex-1 mx-4">
                        {
                            opinions[opinionIndex] && 
                            opinions[opinionIndex].opinion
                        }
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 bg-sub rounded-full text-white text-lg font-bold" onClick={nextOpinion}>
                        {'>'}
                    </div>
                </div>
                <div>
                    {
                        categories.map((category, index) => {
                            if (category.category_id && category.category_id > 0 && opinions[opinionIndex]) {
                                return (
                                    <div 
                                        key={index} 
                                        className={"px-3 py-2 mb-4 rounded-lg text-xl text-white drop-shadow-lg " + (category.category_id == opinions[opinionIndex].categoryId ? "bg-gray-300" : "bg-rise") }
                                        onClick={() => setCategory(category.category_id!)}>
                                        {category.category_name}
                                    </div>
                                );
                            }
                        })
                    }
                </div>
                <div className="flex justify-between mt-4">
                    <div>
                        <LinkButton href={RouteManager.webRoute.member.village.my.details.category.make + villageState.village.village_id}>
                          カテゴリー編集
                        </LinkButton>
                    </div>
                    <div>
                        <LinkButton href={RouteManager.webRoute.member.village.my.details.opinions + villageState.village.village_id}>
                            意見一覧
                        </LinkButton>
                    </div>
                </div>
            </div>
        </_BaseMemberLayout>
    )
}

export default MyVillageCategory;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    console.log(session);
    if (AuthService.check(session)) {
        return { props: {} }
    }
    return AuthService.authFailed();
}
