import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { LinkButton } from "@/components/atoms/buttons/linkButton";
import { VillageTitle } from "@/components/modules/member/village/villageTitle";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { CommentSatisfaction } from "@/components/templates/member/village/my/details/satisfaction/comment";
import { SatisfactionConfirm } from "@/components/templates/member/village/my/details/satisfaction/confirm";
import { DecidingSatisfaction } from "@/components/templates/member/village/my/details/satisfaction/satisfaction";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Category, Satisfaction as SatisfactionType } from "villageType";

const Satisfaction: NextPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const pageLoading = usePageLoading();
  const villageState = useVillage();
  const [categories, setCategories] = useState<Category[]>([]);

  const [page, setPage] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);

  const [comment, setComment] = useState("");
  const [satisfactions, setSatisfactions] = useState<SatisfactionType[]>([]);

  const changeTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = e.target;
      const value = target.value;
      setComment(value);
  }

  useEffect(() => {
    if (status === "authenticated") {
      reload();
    }
  }, [status]);

  useEffect(() => {
    let satisfactionData:SatisfactionType[] = [];
    categories.map((category) => {
      const policyId = category.policy!.policy_id;
      satisfactionData.push({
        policy_id : policyId,
        level : 1,
      })
    });
    setSatisfactions(satisfactionData);
  }, [categories]);

  const reload = () => {
    pageLoading.show();
    setPage(0);
    setIndex(0);
    setComment('');
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

  const onAnswere = () => {
    setPage(1);
  }

  const onBack = () => {
    if(page == 2){
      setPage(1);
      return;
    }
    if(index == 0){
      setPage(0);
    }else{
      setIndex(index-1);
    }
  }

  const onNext = () => {
    if(index == categories.length-1){
      setPage(2);
    }else{
      setIndex(index+1);
    }
  }

  // const onRegister = () => {
  //   pageLoading.show();
  //   axios.post(ApiService.getFullURL(RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.policy, { 'id': id })),
  //     {
  //       comment : comment,
  //     }, 
  //     ApiService.getAuthHeader(session)
  //   )
  //   .then((response) => {
  //     const res = ApiService.makeApiResponse(response);
  //     if (res.getSuccess()) {
  //       console.log(res.getResult());
  //       reload();
  //     } else {
  //       alert('失敗');
  //     }
  //   })
  //   .catch(pageLoading.close);
  // }

  const content = () => {
    switch (page) {
      case 0:
        return <SatisfactionConfirm 
          village={villageState.village} 
          categories={categories}
          onAnswere={onAnswere}
        />
      case 1:
        return <DecidingSatisfaction 
          village={villageState.village}
          category={categories[index]}
          onBack={onBack}
          onNext={onNext}
          satisfactions={satisfactions}
          setSatisfactions={setSatisfactions}
        />
      case 2:
        return <CommentSatisfaction 
          village={villageState.village}
          category={categories[index]}
          onBack={onBack}
          onNext={onNext}
        />
      default:
        break;
    }
  }

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader village={villageState.village} menuType={"phase"} />
      <div className="relative py-8">
        <VillageTitle village={villageState.village} _class=''/>
      </div>
      <div>
        {content()}
      </div>
    </_BaseMemberLayout>
  )
}

export default Satisfaction;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
