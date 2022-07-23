import { RouteManager } from "@/app/manages/routeManager";
import { AuthService } from "@/app/services/authService";
import _BaseMemberLayout from "@/layouts/_baseMemberLayout";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";



export default function Dashboard() {

    const { data: session, status } = useSession();

    return (
        <_BaseMemberLayout>
            <div className="text-center">
                ようこそ<br />
                {session?.user.name}さん
            </div>
            <div>
                <Link href={RouteManager.webRoute.member.village.register.index}>
                    ビレッジ作成
                </Link>
            </div>
            <div>
                <Link href={RouteManager.webRoute.member.village.search.index}>
                    ビレッジ検索
                </Link>
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