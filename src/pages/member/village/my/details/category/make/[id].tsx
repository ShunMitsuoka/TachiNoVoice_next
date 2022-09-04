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
import { Category } from "villageType";
import { LinkButton } from "@/components/atoms/buttons/linkButton";

const MyVillageCategory: NextPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const pageLoading = usePageLoading();
  const villageState = useVillage();
  const [categories, setCategories] = useState<Category[]>([]);

  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (status === "authenticated") {
      reload();
    }
  }, [status]);

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    setCategory(value);
  }

  const addCategory = async () => {
    pageLoading.show();
    await axios.post(ApiService.getFullURL(
      RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.category, { 'id': villageState.village.village_id })
    ), {
      category: category
    }, ApiService.getAuthHeader(session))
    .then((response) => {
      const res = ApiService.makeApiResponse(response);
      if(res.getSuccess()){
        setCategory('');
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

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader village={villageState.village} menuType={"opinion"} />
      <VillageTitle village={villageState.village} _class='my-8' />
      <div className="px-8">
        <div className="mb-6 text-center">
          カテゴリーを追加、編集してください。
        </div>
        <div>
          {
             categories.map((category, index) => {
              if(category.category_id && category.category_id > 0){
                return (
                  <div key={index} className="px-3 py-2 mb-4 bg-rise rounded-lg text-xl text-white drop-shadow-lg">
                    {category.category_name}
                  </div>
                );
              }
            })
          }
        </div>
        <div>
          <FormInput
            id='category'
            name='category'
            value={category}
            onChange={changeInputHandler}
          />
          <div className="mt-4 text-right">
            <MiddleButton onClick={addCategory}>
              追加
            </MiddleButton>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <div>
            <LinkButton href={RouteManager.webRoute.member.village.my.details.opinions + villageState.village.village_id}>
              意見一覧
            </LinkButton>
          </div>
          <div>
            <LinkButton href={RouteManager.webRoute.member.village.my.details.category.categorize + villageState.village.village_id}>
              意見分類
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
