import { useState, useEffect } from 'react'
import { FormLabel } from '@/components/atoms/label/formLabel'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { getSession, useSession } from 'next-auth/react'
import { AuthService } from '@/app/services/authService'
import { ApiService } from '@/app/services/apiService'
import { RouteManager } from '@/app/manages/routeManager'
import { SearchResultCard } from '@/components/modules/member/village/searchresultcard'
import { usePageLoading } from '@/hooks/common/usePageLoading'
import Image from 'next/image'
import { LargeButton } from '@/components/atoms/buttons/largeButton'
import { BaseInput } from '@/components/atoms/input/baseInput'
import { SectionTitle } from '@/components/modules/common/section/sectionTitle'


type cardtype = {
    village_id: "",
    title: string,
    content: string,
}


const Search: NextPage = () => {
    const { data: session, status } = useSession();
    const pageLoading = usePageLoading();
    const [keyword, setKeyword] = useState<string>('');
    const [noresult, setNoresult] = useState(true);

    const [formcards, setCards] = useState<cardtype[]>([]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setKeyword(e.target.value);
    }

    const getSearchresult = () => {
        pageLoading.show();
        const params = {
            keyword: keyword,
        };
        const config = ApiService.getAuthHeader(session);
        const setconfig = ApiService.setConfig('params', params, config);

        axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.resource), setconfig)
            .then(function (response) {
                console.log(response.data.result);
                if (response.data.result == '') {
                    setNoresult(false);
                } else {
                    setNoresult(true);
                }
                setCards(response.data.result);
            })
            .catch((error) => {

                console.log(error.response);
            })
            .finally(() => {
                pageLoading.close();
            });

    }
    //初期表示はできたけど検索結果が何もなかった時の処理書いてない
    useEffect(() => {
        if (status === "authenticated") {
            getSearchresult();
        }
    }, [status]);

    const onClickSearch = () => {
        getSearchresult();
    }

    return (
        <_BaseMemberLayout title='ビレッジ検索'>
            <Head>
                <title>検索</title>
            </Head>
            <div className="absolute top-2 right-2">
                <Image
                    src={'/images/common/decoration/tr-deco.svg'}
                    width={300}
                    height={130}
                />
            </div>
            <div className='relative flex flex-col px-8 pt-14'>
                <SectionTitle className='mb-2'>キーワード</SectionTitle>
                <BaseInput
                    type="text"
                    id="keyword"
                    name="keyword"
                    value={keyword}
                    onChange={changeHandler}
                />
                <div className='flex justify-end mt-3'>
                    <LargeButton onClick={onClickSearch}>
                            検索
                    </LargeButton>
                </div>
                <div className='mt-4'>
                    <SectionTitle className=''>参加可能ビレッジ</SectionTitle>
                    {noresult ?
                        <div className='grid grid-cols-12'>
                            {
                                formcards.map((elem, index) => {
                                    return <SearchResultCard key={index} title={elem.title} content={elem.content} id={elem.village_id} />
                                })
                            }
                        </div>
                        :
                        <div className='text-sub text-center text-xl'>
                            該当するものがありません
                        </div>
                    }
                </div>
            </div>
        </_BaseMemberLayout>
    )
}
export default Search

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (AuthService.check(session)) {
        return { props: {} }
    }
    return AuthService.authFailed();
}