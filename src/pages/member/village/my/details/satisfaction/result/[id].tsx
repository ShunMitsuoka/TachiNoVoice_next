import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { LinkButton } from "@/components/atoms/buttons/linkButton";
import { PolicyCard } from "@/components/modules/member/village/policy/policyCard";
import { VillageTitle } from "@/components/modules/member/village/villageTitle";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { PolicyList } from "@/components/templates/member/village/my/details/policy/list";
import { RegisterPolicy } from "@/components/templates/member/village/my/details/policy/register";
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


const SatisfactionResult: NextPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const pageLoading = usePageLoading();
  const villageState = useVillage();
  const villageMethod = useVillageMethod(villageState.village, villageState.setVillage);
  const [categories, setCategories] = useState<Category[]>([]);

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
