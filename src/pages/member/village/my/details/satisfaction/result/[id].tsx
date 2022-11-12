import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { PolicyCard } from "@/components/modules/member/village/policy/policyCard";
import { VillageTitle } from "@/components/modules/member/village/villageTitle";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import { useVillageMethod } from "@/hooks/components/member/village/my/useVillageMethod";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Category } from "villageType";
import nl2br from 'react-nl2br';


const SatisfactionResult: NextPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const pageLoading = usePageLoading();
  const villageState = useVillage();
  const villageMethod = useVillageMethod(villageState.village, villageState.setVillage);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      reload();
    }
  }, [status]);

  const reload = () => {
    pageLoading.show();
    axios.get(ApiService.getFullURL(
      RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.satisfaction, { 'id': id })
    ), ApiService.getAuthHeader(session))
      .then((response) => {
        const res = ApiService.makeApiResponse(response);
        console.log(res);
        if (res.getSuccess()) {
          villageState.setVillage(res.getResult());
          console.log(res.getResult());
          setCategories(res.getResult().categories);
          setComments(res.getResult().comments);
        } else {
          alert('失敗');
        }
      })
      .finally(pageLoading.close);
  }

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader village={villageState.village} menuType={"phase"} />
      <div className="relative py-8">
        <VillageTitle village={villageState.village} _class=''/>
      </div>
      <div className="mb-6 text-center text-xl font-bold">
        結果
      </div>
      <div className="px-6">
      {
        categories.map((category, index) => {
          return(
              <PolicyCard key={index} category={category} satisfactions={category.policy?.satisfactions}/>
          );
        })
            }
      </div>
      {
        comments && comments.length > 0 && 
        <div className="px-6">
          <div className="flex items-end w-full">
            <div className="w-8 h-8 bg-gray-500"></div>
            <div className="flex-1 px-2 border-b border-b-gray-500 text-gray-500 text-lg">コメント</div>
          </div>
          <div className="mt-6">
            {
              comments.map((comment, index) => {
                return(
                    <div key={index} className=" px-4 py-2 mb-4 bg-white rounded-lg shadow-lg text-gray-500">
                      {nl2br(comment)}
                    </div>
                );
              })
            }
          </div>
        </div>
      }
    </_BaseMemberLayout>
  )
}

export default SatisfactionResult;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
