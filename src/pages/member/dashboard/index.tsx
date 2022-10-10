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
            <div className="relative w-full h-full">

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
                <Link href={RouteManager.webRoute.member.village.register.index} className="">
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

                </Link>

            </div >

        </_BaseMemberLayout >
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (AuthService.check(session)) {
        return { props: {} }
    }
    return AuthService.authFailed();
}