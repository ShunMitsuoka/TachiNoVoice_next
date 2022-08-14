import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { AuthService } from "@/app/services/authService";
import { MiddleButton } from "@/components/atoms/buttons/middleButton";
import { FormLabel } from "@/components/atoms/label/formLabel";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import { useVillage } from "@/hooks/components/member/village/my/useVillage";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import axios from "@/libs/axios/axios";
import { JoinVillageResultCard } from '@/components/modules/member/village/joinvillageresultcard'
import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";


type cardtype = {
  member_id: "",
  nickname: string,
  age: string,
  gender: string,
  gender_name: string,
}

const MyVillageMembers: NextPage = () => {

  const { data: session, status } = useSession();
  const pageLoading = usePageLoading();
  const router = useRouter();
  const { id } = router.query;

  const villageState = useVillage();

  const [formcards, setCards] = useState<cardtype[]>([]);

  const data = [
      {
        index: 0,
        name: 'データ1',
        value: 300,
      },
      {
        index: 1,
        name: 'データ2',
        value: 200,
      },
      {
        index: 2,
        name: 'データ3',
        value: 380,
      },
      {
        index: 3,
        name: 'データ3',
        value: 80,
      },
      {
        index: 4,
        name: 'データ4',
        value: 40,
      }
    ]

  useEffect(() => {
    if (status === "authenticated") {
      axios.get(ApiService.getFullURL(
        RouteManager.getUrlWithParam(RouteManager.apiRoute.member.village.members.list, { 'id': id })
      ), ApiService.getAuthHeader(session))
      .then((response) => {
        const res = ApiService.makeApiResponse(response);
        if (res.getSuccess()) {
          villageState.setVillage(res.getResult());
          console.log(res);
          console.log(response.data.result.members.village_members);
          setCards(response.data.result.members.village_members);
        } else {
          alert('失敗');
        }
      });
    }
  }, [status]);

  return (
    <_BaseMemberLayout pageLoding={pageLoading.isPageLaoding}>
      <div className='mt-5 flex justify-center'>
        <FormLabel htmlFor={'title'}>{villageState.village.title}</FormLabel>
      </div>
      <div className='mt-3 flex justify-center'>
        <FormLabel htmlFor={'coremember'}>コアメンバー</FormLabel>
      </div>
      <div className='mt-3 flex justify-center'>
        <FormLabel htmlFor={'coremember'}>{villageState.village.village_member_count}/{villageState.village.village_member_limit}</FormLabel>
      </div>
      <div>
        <div className='mt-3 flex justify-center'>
          {villageState.phaseComponent({
            recruitmentOfMember : {
              host : (
                <MiddleButton onClick={villageState.nextPhase}>
                  募集を締め切る
                </MiddleButton>
              )
            },
            drawingCoreMember : {
              host : (
                <MiddleButton onClick={villageState.startPhase}>
                  抽選を行う
                </MiddleButton>
              )
            }
          })}
        </div>
      </div>
      <PieChart width={730} height={250}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label/>
      </PieChart>
      <div className='grid grid-cols-12 px-6'>
          {
              formcards.map((elem, index) => {
                  return <JoinVillageResultCard key={index} value1={elem.nickname} value2={elem.age} value3={elem.gender_name} id={elem.member_id} />
              })
          }
      </div>
    </_BaseMemberLayout>
  )
}

export default MyVillageMembers

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
