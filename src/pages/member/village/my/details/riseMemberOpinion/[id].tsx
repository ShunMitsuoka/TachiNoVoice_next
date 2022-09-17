import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { VillageTitle } from "@/components/modules/member/village/villageTitle";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { CategoryList } from "@/components/templates/member/village/my/details/riseOpinion/categoryList";
import { Complete } from "@/components/templates/member/village/my/details/riseOpinion/complete";
import { Confirm } from "@/components/templates/member/village/my/details/riseOpinion/confirm";
import { Register } from "@/components/templates/member/village/my/details/riseOpinion/register";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { Category, MyOpinion } from "villageType";

const RiseMemberOpinion: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;
  const villageState = useVillage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>();
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [myOpinions, setMyOpinions] = useState<MyOpinion[]>([]);

  const [opinion, setOpinion] = useState("");

  const changeTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = e.target;
      const value = target.value;
      setOpinion(value);
  }

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (status === "authenticated") {
      pageLoading.show();
      axios.get(ApiService.getFullURL(
        RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.opinion.riseMember, { 'id': id })
      ), ApiService.getAuthHeader(session))
        .then((response) => {
          const res = ApiService.makeApiResponse(response);
          console.log(res);
          if (res.getSuccess()) {
            villageState.setVillage(res.getResult());
            console.log(res.getResult());
            setCategories(res.getResult().categories);
            setMyOpinions(res.getResult().my_details.opinios)
            setPage(0);
          } else {
            alert('失敗');
          }
        })
      .finally(pageLoading.close);
    }
  }, [status]);

  const nextPage = () => {
    setPage(page!+1);
  }

  const backPage = () => {
    setPage(page!-1);
  }

  const onRegister = () => {
    axios.post(ApiService.getFullURL(
      RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.opinion.riseMember, { 'id': villageState.village.village_id })
    ), {
      opinion: opinion,
      category_id: selectedCategory?.category_id,
    }, ApiService.getAuthHeader(session))
      .then((response) => {
        const res = ApiService.makeApiResponse(response);
        if (res.getSuccess()) {
          nextPage();
        } else {
          alert('失敗')
        }
      });
  }

  const content = useMemo(() => {
    switch (page) {
      case 0:
        return (
          <CategoryList 
            village={villageState.village} 
            categories={categories} 
            onClick={(category) => {
              setOpinion('');
              setSelectedCategory(category);
            }} 
            myOpinions={myOpinions}          
          />
        );
      case 1:
        return (
          selectedCategory && 
          <Register 
            village={villageState.village}
            category={selectedCategory}
            onBack={backPage}
            onConfirm={() => {
              setPage(page + 1);
            } }
            opinion={opinion}
            changeTextAreaHandler={changeTextAreaHandler} 
        />
        );
      case 2:
        return (
          selectedCategory && 
          <Confirm 
            village={villageState.village} 
            category={selectedCategory} 
            onBack={backPage} 
            onRegister={onRegister} 
            opinion={opinion} 
          />
        );
      case 3:
        return (
          selectedCategory && 
          <Complete 
            village={villageState.village} 
            category={selectedCategory} 
            onBack={backPage} 
          />
        );
      default:
        break;
    }
  }, [page, opinion]);

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader village={villageState.village} menuType={"opinion"} />
      <div className="relative py-8">
        <VillageTitle village={villageState.village} _class=''/>
        <div className="mt-4 text-center">
          {
            content
          }
        </div>
      </div>
    </_BaseMemberLayout>
  );
}
export default RiseMemberOpinion

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
