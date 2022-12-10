import { VillageTitle } from "@/components/modules/member/village/villageTitle";
import { ComponentLoading } from "@/components/templates/common/loading/componentLoading";
import { PhaseDetailsHeader } from "@/components/templates/member/village/my/details/phaseDetailsHeader";
import { usePageLoading } from "@/hooks/common/usePageLoading";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const Evaluation: NextPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const pageLoading = usePageLoading();


  return (
    <_BaseMemberLayout>
        <PhaseDetailsHeader villageId={Number(id)} menuType={"phase"} />
      <ComponentLoading isShow={!villageState.isInitializedVillage()} loadingText='ビレッジ情報を読み込んでいます' />
      {
        villageState.villageComponent(
          <>
            <div className="relative py-8">
              <VillageTitle village={villageState.village!} _class=''/>
            </div>
            <div>
              {content()}
            </div>
          </>
        )
      }
    </_BaseMemberLayout>
  )
}

export default Evaluation;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
    return { props: {} }
  }
  return AuthService.authFailed();
}
