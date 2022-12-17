import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { utilService } from "@/app/services/utilSerive";
import { LinkButton } from "@/components/atoms/buttons/linkButton";
import { GenderIcon } from "@/components/modules/common/gender/gender";
import { VillageTitle } from "@/components/modules/member/village/villageTitle";
import { ComponentLoading } from "@/components/templates/common/loading/componentLoading";
import { EvaluationComponet } from "@/components/templates/member/village/my/details/opinions/evaluationComponet";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import nl2br from "react-nl2br";
import { Category, MemberDetail } from "villageType";

type CategoryOpinions = {
  category_name: string,
  category_id: number,
  opinion_id: number,
  opinion: string,
  member: MemberDetail
}

type SelectedOpinion = {
  category_name: string,
  category_id: number,
  opinion_id: number,
  opinion: string,
  member: MemberDetail
}

type Evaluation = {
  opinion_id: number,
  value: number
}


const Evaluation: NextPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const pageLoading = usePageLoading();

  const villageState = useVillage();
  const [categoryOpinions, setCategoryOpinions] = useState<CategoryOpinions[]>([]);
  const [opinionIndex, setOpinionIndex] = useState<number>(0);
  const [selectedOpinion, setSelectedOpinion] = useState<SelectedOpinion>();
  const [myEvaluations, setMyEvaluations] = useState<Map<number, Evaluation>>();


  useEffect(() => {
    if (status === "authenticated") {
      init();
    }
  }, [status]);

  useEffect(() => {   
    if(!categoryOpinions) return;

    let evaluatedOpinions:CategoryOpinions[] = [];
    let notEvaluatedOpinions:CategoryOpinions[] = [];

    categoryOpinions.map((opinion) => {
      let opinionId = opinion.opinion_id;
      if(myEvaluations?.has(opinionId)){
        evaluatedOpinions.push(opinion);
      }else{
        notEvaluatedOpinions.push(opinion);
      }
    })
    setCategoryOpinions(evaluatedOpinions.concat(notEvaluatedOpinions));
    if (opinionIndex == evaluatedOpinions.length || notEvaluatedOpinions.length == 0) {
      reloadView(opinionIndex);
    }else{
      setOpinionIndex(evaluatedOpinions.length);
    }
  }, [myEvaluations]);

  useEffect(() => {
    reloadView(opinionIndex);
  }, [opinionIndex]);

  const init = async () => {
    pageLoading.show();
    await reload();
    await reloadEvaluation();
  }

  const reloadView = (index: number) => {
    if(!categoryOpinions[index]) return;
    let opinion = categoryOpinions[index];
    setSelectedOpinion({
      category_name: opinion.category_name,
      category_id: opinion.category_id,
      opinion_id: opinion.opinion_id,
      opinion: opinion.opinion,
      member: opinion.member
    })
  }

  const reloadEvaluation = async () => {
    let evaluationMap = new Map<number, Evaluation>();
    await axios.get(ApiService.getFullURL(
      RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.evaluation, { 'id': id })
    ), ApiService.getAuthHeader(session))
      .then((response) => {
        const res = ApiService.makeApiResponse(response);
        if (res.getSuccess()) {
          let result = res.getResult();
          result.map((data: Evaluation) => {
            evaluationMap.set(data.opinion_id, data);
          });
          setMyEvaluations(evaluationMap);
        } else {
          alert('失敗')
        }
      });
      pageLoading.close();

  }

  const reload = async () => {
    await axios.get(ApiService.getFullURL(
      RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.opinion.index, { 'id': id })
    ), ApiService.getAuthHeader(session))
      .then((response) => {
        const res = ApiService.makeApiResponse(response);
        if (res.getSuccess()) {
          villageState.setVillage(res.getResult());
          let data: CategoryOpinions[] = [];
          let categories: Category[] = res.getResult().categories;
          categories = utilService.shuffle(categories);
          categories.map((category: Category) => {
            if (!category.opinions) return;
            let categoryOpinions = category.opinions;
            let opinions: CategoryOpinions[] = [];
            categoryOpinions.map(opinion => {
              opinions.push({
                category_name: category.category_name,
                category_id: category.category_id!,
                opinion_id: opinion.opinion_id,
                opinion: opinion.opinion,
                member: opinion.member,
              })
            });
            opinions = utilService.shuffle(opinions);
            data = data.concat(opinions)
          })
          setCategoryOpinions(data);
        } else {
          alert('失敗');
        }
      });
  }

  const mySelfEvaluation = () => {
    let value = undefined;
    let evaluation = undefined;
    if (selectedOpinion) evaluation = myEvaluations?.get(selectedOpinion?.opinion_id);
    if (evaluation) value = evaluation.value;
    return value;
  }

  const prevOpinion = () => {
    let nextIndex = opinionIndex - 1;
    if(nextIndex < 0){
      setOpinionIndex(categoryOpinions.length -1);
      return;
    }
    setOpinionIndex(nextIndex)
  }

  const nextOpinion = () => {
    let nextIndex = opinionIndex + 1;
    let opinions = categoryOpinions;
    if(nextIndex > opinions.length - 1){
      setOpinionIndex(0);
      return;
    }
    setOpinionIndex(nextIndex)
  }

  return (
    <_BaseMemberLayout>
      <PhaseDetailsHeader villageId={Number(id)} />
      <ComponentLoading isShow={!villageState.isInitializedVillage()} loadingText='ビレッジ情報を読み込んでいます' />
      {
        villageState.villageComponent(
          <>
            <div className="relative py-4">
              <VillageTitle village={villageState.village!} _class='' />
            </div>
            {selectedOpinion &&
              <div className="px-10">
                <div className="text-center mb-2">
                  メンバーの意見を評価してください
                </div>
                {
                  (myEvaluations?.size === categoryOpinions.length && myEvaluations?.size > 0) &&
                  <div className="text-center mb-3">
                    <LinkButton href={RouteManager.webRoute.member.village.my.details.index + id}>
                      評価終了
                    </LinkButton>
                  </div>
                }
                <div className="text-center mb-5">
                {myEvaluations?.size} / {categoryOpinions.length} 評価済み
                </div>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-sub rounded-full text-white text-lg font-bold" onClick={prevOpinion}>
                    {'<'}
                  </div>
                  {/* カルーセル要素 */}
                  <div className="flex-1 px-4"> 
                    <div>
                      <div>
                        【カテゴリー】
                      </div>
                      <div className={"px-3 py-2 mb-6 rounded-lg text-xl text-white drop-shadow-lg bg-rise"}>
                        {selectedOpinion.category_name}
                      </div>
                    </div>
                    <div>
                      <div>
                        【意見】
                      </div>
                      <div className=' bg-white rounded-lg shadow-md overflow-hidden'>
                        <div className='relative flex items-center px-2 py-1 bg-core'>
                          {
                            selectedOpinion.member.gender &&
                            <div className='flex justify-center items-center mr-2'>
                              <GenderIcon gender={selectedOpinion.member.gender} />
                            </div>
                          }
                          <div>
                            {selectedOpinion.member.nickname}
                          </div>
                          {
                            selectedOpinion.member.age &&
                            <div className='ml-1'>
                              ({selectedOpinion.member.age})
                            </div>
                          }
                        </div>
                        <div className='px-2 py-2 text-sm text-left'>
                          {nl2br(selectedOpinion.opinion)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* カルーセル要素 */}
                  <div className="flex items-center justify-center w-8 h-8 bg-sub rounded-full text-white text-lg font-bold" onClick={nextOpinion}>
                    {'>'}
                  </div>
                </div>
                <EvaluationComponet
                  opinion_id={selectedOpinion.opinion_id}
                  mySelfEvaluation={mySelfEvaluation()}
                  villageId={Number(id)}
                  reload={reloadEvaluation}
                />
              </div>
            }
          </>
        )
      }
    </_BaseMemberLayout>
  )
}

export default Evaluation;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
