import { appConst } from "@/app/const/appConst";
import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { LinkButton } from "@/components/atoms/buttons/linkButton";
import { MiddleButton } from "@/components/atoms/buttons/middleButton";
import { VillageTitle } from "@/components/modules/member/village/villageTitle";
import { OpinionCard } from "@/components/templates/member/village/my/details/opinions/opinionCard";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { usePhaseComponent } from "@/hooks/components/member/village/my/usePhaseComponent";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import { useVillageMethod } from "@/hooks/components/member/village/my/useVillageMethod";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Category } from "villageType";

import { FaExchangeAlt } from "react-icons/fa";

const MyVillageOpinios: NextPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const pageLoading = usePageLoading();
  const villageState = useVillage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [slectedCategoryId, setSlectedCategoryId] = useState<number>(appConst.village.category.uncategorized);
  const [dispCategory, setDispCategory] = useState<Category>();
  const villageMethod = useVillageMethod(villageState.village, villageState.setVillage);
  const phaseComponet = usePhaseComponent(villageState.village);
  const [openCategoryList, setOpenCategoryList] = useState<boolean>(false);
  const [isAbleToCategorize, setIsAbleToCategorize] = useState<boolean>(false);
  const [isAbleToFinishCategorizing, setIsAbleToFinishCategorizing] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") {
      pageLoading.show();
      axios.get(ApiService.getFullURL(
        RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.opinion.index, { 'id': id })
      ), ApiService.getAuthHeader(session))
        .then((response) => {
          const res = ApiService.makeApiResponse(response);
          console.log(res);
          if (res.getSuccess()) {
            villageState.setVillage(res.getResult());
            console.log(res.getResult());
            setCategories(response.data.result.categories);
          } else {
            alert('失敗');
          }
        });
    }
  }, [status]);

  useEffect(() => {
    for (const key in categories) {
      const category = categories[key];
       if(category.category_id === appConst.village.category.uncategorized && category.opinions && category.opinions.length === 0){
        setIsAbleToFinishCategorizing(true);
       }
       if(category.category_id !== appConst.village.category.uncategorized){
        setIsAbleToCategorize(true);
       }
    }
    for (const key in categories) {
      const category = categories[key];
      if(category.opinions  && category.opinions.length > 0){
        if(category.category_id! == slectedCategoryId){
          updateDispCategory(slectedCategoryId);
        }else{
          setSlectedCategoryId(category.category_id!);
        }
        break;
      }
    }
  }, [categories]);

  useEffect(() => {
    updateDispCategory(slectedCategoryId);
  }, [slectedCategoryId]);

  const updateDispCategory = (slectedId :  number) => {
    for (const key in categories) {
      const category = categories[key];
      if(category.category_id == slectedId){
        setDispCategory(category);
        break;
      }
    }
    pageLoading.close();
  }


  const onOpenCategoryList = () => {
    setOpenCategoryList(true);
  }

  const onCloseCategoryList = () => {
    setOpenCategoryList(false);
  }

  return (
    <_BaseMemberLayout>
      {
        openCategoryList &&
        <div className="fixed top-0 left-0 h-full w-full z-10">
          <div className="absolute top-0 left-0 h-full w-full" onClick={onCloseCategoryList}>
          </div>
          <div className=" absolute top-0 right-0 flex flex-col justify-center h-screen w-9/12 px-4 bg-main rounded-tl-full rounded-bl-full drop-shadow-lg">
            {
              categories.map((category, index) => {
                return(
                  <div key={index}>
                    {
                      category && category.opinions && category.opinions.length > 0 &&
                      <div 
                        className={"px-3 py-2 mb-6 rounded-lg text-xl text-white drop-shadow-lg " + (category.category_id == slectedCategoryId ? "bg-rise" : "bg-gray-300") }
                        onClick={() => {
                          setSlectedCategoryId(category.category_id!);
                          onCloseCategoryList();
                        }}>
                        {category.category_name}
                      </div>
                    }
                  </div>
                );
              })
            }
          </div>
        </div>
      }
      <PhaseDetailsHeader village={villageState.village} menuType={"opinion"} />
      <div className="relative py-8">
        <VillageTitle village={villageState.village} _class=''/>
        <div className="mt-4 px-4 text-center">
          {phaseComponet.phaseComponent({
            askingOpinionsOfCoreMember: {
              host: (
                <MiddleButton onClick={villageMethod.nextPhase}>
                  意見募集終了
                </MiddleButton>
              )
            },
            categorizeOpinions: {
              host: (
                <>
                  {
                    isAbleToCategorize ? 
                    <div className="flex justify-between">
                      <div>
                        <LinkButton href={RouteManager.webRoute.member.village.my.details.category.make + villageState.village.village_id}>
                          カテゴリー作成
                        </LinkButton>
                      </div>
                      <div>
                        <LinkButton href={RouteManager.webRoute.member.village.my.details.category.categorize + villageState.village.village_id}>
                          意見分類
                        </LinkButton>
                      </div>
                    </div>
                    :
                    <div>
                      <LinkButton href={RouteManager.webRoute.member.village.my.details.category.make + villageState.village.village_id}>
                        カテゴリー作成
                      </LinkButton>
                    </div>
                  }
                </>
              )
            }
          })}
        </div>
        {phaseComponet.phaseComponent({
            categorizeOpinions: {
              host: (
                <>
                  {
                    isAbleToFinishCategorizing &&
                    <div className="mt-4 px-4  text-right">
                      <MiddleButton onClick={villageMethod.nextPhase}>
                        分類終了
                      </MiddleButton>
                    </div>
                  }
                </>
              )
            }
        })}
          {
            dispCategory && 
            <div className="relative py-3 mt-6 text-center bg-rise text-white text-lg font-bold">
              {dispCategory.category_name}
              <FaExchangeAlt className="absolute top-4 right-6 text-xl" onClick={onOpenCategoryList}/>
            </div>
          }
        <div className="px-4 mt-6">
          { dispCategory && dispCategory.opinions && 
            dispCategory.opinions.map((opinion, index) => {
              let member = opinion.member;
              return (
                <div key={index} className="mt-4">
                  <OpinionCard name={member.nickname} opinion={opinion.opinion} gender={member.gender} age={member.age} />
                </div>
              );
            })
          }
        </div>
      </div>
    </_BaseMemberLayout>
  )
}

export default MyVillageOpinios;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
