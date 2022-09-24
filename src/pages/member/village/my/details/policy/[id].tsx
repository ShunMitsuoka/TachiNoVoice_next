import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { LinkButton } from "@/components/atoms/buttons/linkButton";
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


const Policy: NextPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const pageLoading = usePageLoading();
  const villageState = useVillage();
  const villageMethod = useVillageMethod(villageState.village, villageState.setVillage);
  const [categories, setCategories] = useState<Category[]>([]);

  const [page, setPage] = useState<number>(0);
  const [selectedCategory, setelectedCategory] = useState<Category>();

  const [policy, setPolicy] = useState("");
  const changeTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = e.target;
      const value = target.value;
      setPolicy(value);
  }

  useEffect(() => {
    if (status === "authenticated") {
      reload();
    }
  }, [status]);

  const reload = () => {
    pageLoading.show();
    setPage(0);
    setelectedCategory(undefined);
    setPolicy('');
    axios.get(ApiService.getFullURL(
      RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.opinion.index, { 'id': id })
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

  const onDecidePolicy = (category : Category) => {
    setPage(1);
    setelectedCategory(category);
  }

  const onBack = () => {
    setPage(0);
    setelectedCategory(undefined);
  }

  const onRegister = () => {
    pageLoading.show();
    axios.post(ApiService.getFullURL(RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.policy, { 'id': id })),
      {
        categoryId: selectedCategory?.category_id,
        policy : policy,
      }, 
      ApiService.getAuthHeader(session)
    )
    .then((response) => {
      const res = ApiService.makeApiResponse(response);
      if (res.getSuccess()) {
        console.log(res.getResult());
        reload();
      } else {
        alert('失敗');
      }
    })
    .catch(pageLoading.close);
  }

  const content = () => {
    switch (page) {
      case 0:
        return <PolicyList 
          village={villageState.village} 
          categories={categories} 
          onDecidePolicy={onDecidePolicy} 
          nextPhase={villageMethod.nextPhase}
        />
      case 1:
        return <RegisterPolicy 
          village={villageState.village}
          category={selectedCategory!}
          onBack={onBack}
          policy={policy}
          changeTextAreaHandler={changeTextAreaHandler} 
          onRegister={onRegister} />
      default:
        break;
    }
  }

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader village={villageState.village} menuType={"opinion"} />
      <div className="relative py-8">
        <VillageTitle village={villageState.village} _class=''/>
      </div>
      <div>
        {content()}
      </div>
    </_BaseMemberLayout>
  )
}

export default Policy;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
