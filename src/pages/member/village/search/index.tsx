import { useState } from 'react'
import { FormLabel } from '@/components/atoms/label/formLabel'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { format } from 'path'

type formData = {
    keyword: string,
}

const Search: NextPage = () => {

    const [keyword, setKeyword] = useState<formData>({
        keyword: "",
    });
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setKeyword(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value }
        });
    }

    const onClickSearch = () => {
        axios.get('/member/village')
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
        </_BaseMemberLayout>
    )
}

export default Search
