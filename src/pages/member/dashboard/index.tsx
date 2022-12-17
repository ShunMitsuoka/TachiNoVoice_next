import { RouteManager } from "@/app/manages/routeManager";
import { AuthService } from "@/app/services/authService";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { MyVillageList } from "@/components/templates/member/village/dashboard/myVillageList";
import { LinkButton } from "@/components/atoms/buttons/linkButton";


export default function Dashboard() {

    const { data: session, status } = useSession();

    return (
        <_BaseMemberLayout isShowDecoration={true}>
            <div className="relative w-full h-full">
                <div className=" flex flex-col ">
                    <div className="text-center text-2xl mt-10 mb-2">
                        ようこそ<br />
                    </div>
                    <div className="flex justify-center text-center text-2xl">
                        {session?.user.name}さん
                    </div>
                </div>
                <div className="px-6 pt-8">
                    <div className="border-b border-sub font-bold">参加中ビレッジ</div>
                    <MyVillageList />
                </div>
                <div className="px-6 mt-3">
                    <div className="border-b border-sub font-bold">ビレッジを作る</div>
                    <div className=" grid grid-cols-12 mt-4">
                        <div className=" col-span-4">
                            <span className="flex justify-center items-center w-20 h-20 bg-host rounded-full">ホスト</span>
                        </div>
                        <div className=" col-span-8 text-sm">
                            問題提起を行って<br />
                            共に考えていくメンバーを募集し<br />
                            様々な意見を取り入れながら<br />
                            問題解決へと導きます。
                        </div>
                        <div className=" col-span-12 text-center mt-4">
                            <LinkButton href={RouteManager.webRoute.member.village.register.setting}>
                            ビレッジを作成する
                            </LinkButton>
                        </div>
                    </div>
                </div>
                {/* <Link href={RouteManager.webRoute.member.village.register.index} className="">
                    <div className="absolute top-[430px] right-5 ">
                        <div className=" font-bold bg-red text-center rounded-[50%] w-[200px] h-[100px] leading-[100px] drop-shadow-lg">

                            ビレッジ作成

                        </div>
                    </div>
                </Link>
                <Link href={RouteManager.webRoute.member.village.search.index}>
                    <div className="absolute top-[330px] left-5">
                        <div className=" font-bold bg-lime-100 text-center rounded-[50%] w-[200px] h-[100px] leading-[100px] drop-shadow-lg">

                            ビレッジを探す

                        </div>
                    </div>
                </Link>


                <Link href={RouteManager.webRoute.member.village.my.index}>
                    <div className="absolute top-[230px] right-5">
                        <div className=" font-bold bg-orange text-center rounded-[50%] w-[200px] h-[100px] leading-[100px] drop-shadow-lg">
                            参加中のビレッジへ
                        </div>
                    </div>

                </Link> */}

            </div >

        </_BaseMemberLayout >
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    console.log(session);
    if(!AuthService.isEmailVerified(session)) return AuthService.verifiedFailed();
    if (AuthService.check(session)) {
        return { props: {} }
    }
    return AuthService.authFailed();
}