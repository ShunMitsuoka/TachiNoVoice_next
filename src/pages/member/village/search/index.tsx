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


type formData = {
    keyword: string,
};
type cardtype = {
    village_id: "",
    title: string,
    content: string,
}


const Search: NextPage = () => {
    const { data: session, status } = useSession();
    const pageLoading = usePageLoading();
    const [formkeyword, setKeyword] = useState<formData>({
        keyword: "",
    });
    const [noresult, setNoresult] = useState(true);

    const [formcards, setCards] = useState<cardtype[]>([]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setKeyword(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value }
        });
    }

    const getSearchresult = () => {
        const params = {
            keyword: formkeyword.keyword,
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

    }
    //初期表示はできたけど検索結果が何もなかった時の処理書いてない
    useEffect(() => {
        if (status === "authenticated") {
            pageLoading.show();
            getSearchresult();
            pageLoading.close();
        }
    }, [status]);

    const onClickSearch = () => {
        pageLoading.show();
        getSearchresult();
        pageLoading.close();
    }

    return (
        <_BaseMemberLayout pageLoding={pageLoading.isPageLaoding}>
            <Head>
                <title>検索</title>
            </Head>
            <div className='flex flex-col px-10 mt-2'>
                <FormLabel
                    htmlFor={'keyword'}
                    _class='block mb-2 pt-4 px-2text-sm font-medium text-sub text-gray-900 text-main'>キーワード</FormLabel>
                <input
                    type='text'
                    name="keyword"
                    id="keyword"
                    className='border border-solid rounded-lg border-sub text-2xl leading-relaxed px-2'
                    onChange={changeHandler}
                />
            </div>
            <div className='flex  justify-end px-10 mt-2'>
                <button
                    className='font-semibold px-7 py-3 rounded-lg bg-sub text-main'
                    onClick={onClickSearch}
                >検索</button>
            </div>
            {noresult ?
                <div className='grid grid-cols-12 px-6'>
                    {
                        formcards.map((elem, index) => {
                            return <SearchResultCard key={index} value1={elem.title} value2={elem.content} id={elem.village_id} />
                        })
                    }
                </div>
                :
                <div className='text-sub text-center text-3xl'>
                    該当するものがありません
                </div>
            }
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