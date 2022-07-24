import { useState } from 'react'
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


type formData = {
    keyword: string,
};

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
        const params = {
            keyword: formkeyword.keyword,
        };
        const config = ApiService.getAuthHeader(session);
        ApiService.setConfig('params', params, config);

        console.log(config);
        axios.get(ApiService.getFullURL(RouteManager.apiRoute.member.village.resource), config)
            .then(function (response) {
                console.log('true');
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    //データをとってきて、とってきたデータ分のタイトルとcontentを表示する

    return (
        <_BaseMemberLayout>
            <Head>
                <title>検索</title>
            </Head>
            <div className='flex flex-col px-10 mt-2'>
                <FormLabel
                    htmlFor={'search'}
                    _class='block mb-2 pt-4 px-2text-sm font-medium text-gray-900 dark:text-gray-400'>キーワード</FormLabel>
                <textarea
                    name="serach"
                    id="serach"
                    cols={20}
                    rows={2}
                    className='border border-solid border-sub rounded-lg'
                    onChange={changeHandler}
                >
                </textarea>
            </div>
            <div className='flex  justify-end px-10 mt-2'>
                <button
                    className='font-semibold px-5 py-3 rounded-lg bg-sub text-main text'
                    onClick={onClickSearch}
                >検索</button>
            </div>
            <div>

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