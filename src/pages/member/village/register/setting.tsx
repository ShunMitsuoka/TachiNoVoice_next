import { BaseButton } from '@/components/atoms/buttons/baseButton'
import { FormInput } from '@/components/atoms/input/formInput'
import { FormLabel } from '@/components/atoms/label/formLabel'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

type formData = {
    title: string,
    content: string,
    note: string,
}

const Register: NextPage = () => {

    const [page, setPage] = useState<number>(1);

    const [formData, setFormData] = useState<formData>({
        title: "",
        content: "",
        note: "",
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value }
        });
    }

    const onClickNext = () => {
        setPage(page+1);
    }

    const onClickCancel = () => {
        setPage(page-1);
    }


    const pageSegue = () => {
        switch (page) {
            case 1:
                return(
                    <>
                        <div>
                            <FormLabel htmlFor={'title'}>タイトル</FormLabel>
                            <FormInput
                                id='title'
                                name='title'
                                value={formData.title}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className='mt-2'>
                            <FormLabel htmlFor={'content'}>説明</FormLabel>
                            <textarea
                                name="content"
                                id="content"
                                cols={30}
                                rows={6}
                                className='w-full border border-sub rounded-lg px-2 py-2'
                                value={formData.content}
                                onChange={changeHandler}
                            >
                            </textarea>
                        </div>
                        <div className='mt-2'>
                            <FormLabel htmlFor={'note'}>注意事項</FormLabel>
                            <textarea
                                name="note"
                                id="note"
                                cols={30}
                                rows={6}
                                className='w-full border border-sub rounded-lg px-2 py-2'
                                value={formData.note}
                                onChange={changeHandler}
                            >
                            </textarea>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <div>
                                <BaseButton>キャンセル</BaseButton>
                            </div>
                            <div>
                                <BaseButton onClick={onClickNext}>次へ</BaseButton>
                            </div>
                        </div>
                    </>
                );
                break;
            case 2:
                return(
                    <>
                        <div>
                            <FormLabel htmlFor={''}>コアメンバー</FormLabel>
                            <FormInput
                                id='title'
                                name='title'
                                value={formData.content}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className='mt-2'>
                            <FormLabel htmlFor={'content'}>条件</FormLabel>
                            <textarea
                                name="content"
                                id="content"
                                cols={30}
                                rows={6}
                                className='w-full border border-sub rounded-lg px-2 py-2'
                                value={formData.content}
                                onChange={changeHandler}
                            >
                            </textarea>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <div>
                                <BaseButton onClick={onClickCancel}>キャンセル</BaseButton>
                            </div>
                            <div>
                                <BaseButton onClick={onClickNext}>次へ</BaseButton>
                            </div>
                        </div>
                    </>
                );
                break;
                case 3:
                    return(
                        <>
                            <div>
                                <FormLabel htmlFor={''}>タイトル</FormLabel>
                                <div>
                                    {formData.title}
                                </div>
                            </div>
                            <div className='flex justify-between mt-4'>
                            <div>
                                <BaseButton onClick={onClickCancel}>キャンセル</BaseButton>
                            </div>
                        </div>
                        </>
                    );
                    break;
            default:
                break;
        }
    }

    return (
        <_BaseMemberLayout>
            <Head>
                <title>ビレッジ設定</title>
            </Head>

            <div className='px-10 mt-10'>
                {pageSegue()}
            </div>
        </_BaseMemberLayout>
    )
}

export default Register