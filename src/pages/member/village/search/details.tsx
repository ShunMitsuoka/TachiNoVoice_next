import { BaseButton } from '@/components/atoms/buttons/baseButton'
import { FormLabel } from '@/components/atoms/label/formLabel'
import _BaseLayout from '@/layouts/_baseLayout'
import _BaseMemberLayout from '@/layouts/_baseMemberLayout'
import axios from '@/libs/axios/axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Details: NextPage = () => {

  // const onClickEntry = () => {
  //   const params = {
  //     village_id: 1
  //   };
  //   axios.get('/member/village/details', params)
  //       .then(function (response) {
  //           console.log('true');
  //           console.log(response);
  //       })
  //       .catch((error) => {
  //           console.error(error);
  //       });

  // }

  return (
    <_BaseMemberLayout>
      <div className='mt-5 flex justify-center'>
        <FormLabel htmlFor={'title'}>〇〇県〇〇市避難所について</FormLabel>
      </div>
      <div className='mt-2 px-10'>
        <div className='mt-2 text-center'>
            {/* <FormLabel htmlFor={'content'} _class=''>説明</FormLabel> */}
            <p
                className='w-full border border-sub rounded-lg px-2 py-2'
                // value={formData.content}
            >
            </p>
        </div>
        <div className='mt-2 text-center'>
            <FormLabel htmlFor={'note'} _class=''>注意事項</FormLabel>
            <p
                className='w-full border border-sub rounded-lg px-2 py-2'
                // value={formData.content}
            >
            </p>
        </div>
        <div className='mt-2 text-center'>
            <FormLabel htmlFor={'condition'}>参加条件</FormLabel>
            <p
                className='w-full border border-sub rounded-lg px-2 py-2'
                // value={formData.content}
            >

            </p>
        </div>
        <div className='mt-2 text-center'>
            <FormLabel htmlFor={'recruitment_period'}>募集期間</FormLabel>
            <p
                className='w-full border border-sub rounded-lg px-2 py-2'
                // value={formData.content}
            >
            </p>
        </div>
        <div className="text-center mt-6">
            {/* <BaseButton
              onClick={onClickEntry}
            > */}
            <BaseButton>
                参加する
            </BaseButton>
        </div>
      </div>
    </_BaseMemberLayout>
  )
}

export default Details

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (AuthService.check(session)) {
      return { props: {} }
  }
  return AuthService.authFailed();
}
