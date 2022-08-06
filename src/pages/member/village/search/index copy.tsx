import { useEffect, useState } from 'react'
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


//pageloadingはregister/setting.tsxにサンプルあり

type formData = {
    keyword: string,
};
type formresultnum = {
    resultnum: string,
}


type cardtype = {
    id: "",
    title: string,
    content: string,
}

const kansuux = () => {
    //これを関数xとして
    const { data: session, status } = useSession();
    const [formkeyword, setKeyword] = useState<formData>({
        keyword: "",
    });
    const [formcards, setCards] = useState<cardtype[]>([]);
    const params = {
        keyword: formkeyword.keyword,
    };
    const config = ApiService.getAuthHeader(session);
    ApiService.setConfig('params', params, config);
    console.log(ApiService.getFullURL(RouteManager.apiRoute.member.village.resource), {
        params: {
            keyword: formkeyword,
        }
    })

    axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.resource), config)
        .then(function (response) {
            console.log('true');
            setCards(response.data.result);
        })
        .catch((error) => {
            console.error(error);
        });

}
useEffect(() => {
    //ここに関数x
    kansuux();
}, []);

const Search: NextPage = () => {
    const { data: session, status } = useSession();

    const [formkeyword, setKeyword] = useState<formData>({
        keyword: "",
    });


    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setKeyword(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value }
        });
    }

    const onClickSearch = () => {
        //ここも関数xにする
        //どういう関数にするの？
        kansuux
    }

    return (
        <_BaseMemberLayout>
            <Head>
                <title>検索</title>
            </Head>
            <div className='flex flex-col px-10 mt-2'>
                <FormLabel
                    htmlFor={'keyword'}
                    _class='block mb-2 pt-4 px-2text-sm font-medium text-gray-900 text-main'>キーワード</FormLabel>
                <input
                    type='text'
                    name="keyword"
                    id="keyword"
                    className='border border-solid border-sub text-2xl leading-relaxed'
                    onChange={changeHandler}
                />
            </div>
            <div className='flex  justify-end px-10 mt-2'>
                <button
                    className='font-semibold px-5 py-3 rounded-lg bg-sub text-main'
                    onClick={onClickSearch}
                >検索</button>
            </div>
            <div className='grid grid-cols-12 px-6 md:px-20'>
                {
                    formcards.map((elem, index) => {
                        return <SearchResultCard key={index} value1={elem.title} value2={elem.content} id={elem.id} />
                    })
                }
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