import { RouteManager } from "@/app/manages/routeManager";
import { AuthService } from "@/app/services/authService";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import Image from 'next/image'


export default function Dashboard() {

    const { data: session, status } = useSession();

    return (
        <_BaseMemberLayout>
            <div className="relative w-[100%] h-[100%]">

                <div className="absolute top-2 left-2">
                    <Image
                        src={'/images/common/decoration/tl-deco.svg'}
                        width={300}
                        height={130}
                    />
                </div>

                <div className=" flex flex-col ">
                    <div className="text-center text-4xl py-6">
                        ようこそ<br />
                    </div>
                    <div className="flex justify-center text-center text-4xl">
                        {session?.user.name}さん
                    </div>
                </div>
                <div className="absolute top-[500px] bottom-0 right-10 ">
                    <div className=" font-bold bg-red text-center rounded-[50%] w-[200px] h-[100px] leading-[100px] drop-shadow-lg">
                        <Link href={RouteManager.webRoute.member.village.register.index} className="">
                            ビレッジ作成
                        </Link>
                    </div>
                </div>
                <div className="absolute top-[400px] bottom-0 left-10">
                    <div className=" font-bold bg-lime-100 text-center rounded-[50%] w-[200px] h-[100px] leading-[100px] drop-shadow-lg">
                        <Link href={RouteManager.webRoute.member.village.search.index}>
                            ビレッジを探す
                        </Link>
                    </div>
                </div>
                <div className="absolute top-[300px] bottom-0 right-10">
                    <div className=" font-bold bg-orange text-center rounded-[50%] w-[200px] h-[100px] leading-[100px] drop-shadow-lg">
                        <Link href={RouteManager.webRoute.member.village.my.index}>
                            参加中のビレッジへ
                        </Link>
                    </div>
                </div>
            </div>

        </_BaseMemberLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (AuthService.check(session)) {
        return { props: {} }
    }
    return AuthService.authFailed();
}