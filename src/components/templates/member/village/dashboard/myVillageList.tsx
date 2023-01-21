import { RouteManager } from "@/app/manages/routeManager";
import { ApiService } from "@/app/services/apiService";
import { ColorService } from "@/app/services/colorService";
import { useComponentLoading } from "@/hooks/common/useComponentLoading";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Village } from "villageType";

export const MyVillageList = () => {

    const { data: session, status } = useSession();
    const [lists, setLists] = useState<Village[]>([]);

    const loading = useComponentLoading();
  
    useEffect(() => {
      if (status === "authenticated") {
        loading.show();
        const params = {
            recordNum: 3,
            finishedFlg: false,
        };
        const config = ApiService.getAuthHeader(session);
        const setconfig = ApiService.setConfig('params', params, config);
        axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.my.index), setconfig)
          .then(function (response) {
            const res = ApiService.makeApiResponse(response);
            if (res.getSuccess()) {
              const result = res.getResult();
              setLists(result.data);
            } else {
              alert('失敗');
            }
          })
          .finally(() => {
              loading.close();
          });
      }
    }, [status]);

    return (
        <div className="py-4">
            {loading.loadingComponent('参加中のビレッジを読み込んでいます。')}
            {loading.displayComponent(
                <>
                {
                    (lists.length > 0) ?
                    <>
                        {
                            lists.map((village, index) => {
                                return (
                                    <div key={index} className='relative px-3 py-3 bg-white rounded-lg shadow-lg mb-2'>
                                        <div className="grid grid-cols-12 gap-3">
                                            <div className=" col-span-4">
                                                <Image src={'/images/member/village/village.png'} width={30} height={17} layout={'responsive'}/>
                                            </div>
                                            <div className=" col-span-8">
                                                <div className={' inline-block rounded-full px-1 text-white text-sm ' + ColorService.bgRoleColre(village.role_id)}>{village.role_name}</div>
                                                <div className=" font-bold mt-1">
                                                    {village.title}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            ・{village.phase_name}
                                        </div>
                                        <div className='relative'>
                                        <Link href={RouteManager.webRoute.member.village.my.details.index + village.village_id}>
                                            <span className=" absolute bottom-0 right-0 inline-block bg-gray-400 rounded-full px-2 py-1 text-white text-sm ">
                                                ビレッジへ
                                            </span>
                                        </Link>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <div className="text-right">
                            <Link href={RouteManager.webRoute.member.village.my.index}>
                                <span className="inline-block underline text-lg">
                                    {'>'}more
                                </span>
                            </Link>
                        </div>
                    </>
                    :
                    <div>
                        参加中のビレッジがまだありません。
                        <div className="mt-2">
                            <Link href={RouteManager.webRoute.member.village.search.index}>
                                <span className="inline-block underline text-lg">
                                    {'>'}ビレッジを探す
                                </span>
                            </Link>
                        </div>
                    </div>
                }
                </>
            )}
        </div>
    )
}