import { BaseButton } from '@/components/atoms/buttons/baseButton';
import { formData } from '@/pages/member/village/register/setting';
import React, { useMemo, useState } from 'react';

interface Props {
    formData: formData;
    onClickRegister: () => void;
    onClickCancel: () => void;
}

export const ConfirmVillageSetting: React.FC<Props> = ({
    formData,
    onClickRegister,
    onClickCancel,
}) => {

    const [tab, setTab] = useState<number>(1);

    const publciInfoContent = () => {
        const list = [];
        if(formData.age_flg){
            list.push('年齢');
        }
        if(formData.gender_flg){
            list.push('性別');
        }
        return list;
    }

    const content = useMemo(() => {
        switch (tab) {
            case 1:
                return(
                    <>
                        <div>
                            <span className='text-xl font-bold mr-1'>◆</span>
                            <span className='text-xl font-bold'>タイトル</span>
                            <div className='text-xl mt-1'>
                                {formData.title}
                            </div>
                        </div>
                        <div className='mt-2'>
                            <span className='text-xl font-bold mr-1'>◆</span>
                            <span className='text-xl font-bold'>説明</span>
                            <div className='mt-2'>
                                {formData.content ? formData.content : '無し'}
                            </div>
                        </div>
                        <div className='mt-2'>
                            <span className='text-xl font-bold mr-1'>◆</span>
                            <span className='text-xl font-bold'>注意事項</span>
                            <div className='mt-2'>
                                {formData.note ? formData.note : '無し'}
                            </div>
                        </div>
                    </>
                );
        case 2:
            return(
                <>
                    <div>
                        <span className='text-xl font-bold mr-1'>◆</span>
                        <span className='text-xl font-bold'>ビレッジメンバー定員</span>
                        <div className='mt-2'>
                            {formData.village_member_limit}
                            <span className='ml-1'>人</span>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <span className='text-xl font-bold mr-1'>◆</span>
                        <span className='text-xl font-bold'>コアメンバー定員</span>
                        <div className='mt-2'>
                            {formData.core_member_limit}
                            <span className='ml-1'>人</span>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <span className='text-xl font-bold mr-1'>◆</span>
                        <span className='text-xl font-bold'>条件</span>
                        <div className='mt-2'>
                            {formData.requirement ? formData.requirement : '無し'}
                        </div>
                    </div>
                    <div className='mt-2'>
                        <span className='text-xl font-bold mr-1'>◆</span>
                        <span className='text-xl font-bold'>開示情報</span>
                        <div className='mt-2'>
                            {
                                publciInfoContent().length ? (
                                    publciInfoContent().map((name, index) => {
                                        return (
                                            <li key={index}>{name}</li>
                                        )
                                    })
                                ) : '無し'
                            }
                        </div>
                    </div>
                    <div className='mt-2'>
                        <span className='text-xl font-bold mr-1'>◆</span>
                        <span className='text-xl font-bold'>募集開始条件</span>
                        <div className='mt-2'>
                            {
                                formData.start_by_instant_flg ?
                                <>ビレッジ作成後、即時募集開始</> :
                                <>手動で開始</>
                            }
                        </div>
                    </div>
                    {/* <div className='mt-2'>
                        <span className='text-xl font-bold mr-1'>◆</span>
                        <span className='text-xl font-bold'>募集終了条件</span>
                        <div className='mt-2'>
                            定員になり次第終了
                        </div>
                    </div> */}
                </>
            );
            default:
                break;
        }
        return null;
      }, [tab])

    return (
        <>
            <div className=' grid grid-cols-2 w-full bg-sub text-center text-main text-sm drop-shadow-md'>
                <div className='relative px-10' onClick={() => setTab(1)}>
                    <span className='inline-block pt-2 pb-1'>
                        設定確認
                    </span>
                    { tab == 1 && 
                        <div className='absoulte bottom-0 border-b-4 border-main'></div>
                    }
                </div>
                <div className='relative px-10' onClick={() => setTab(2)}>
                    <span className=' inline-block pt-2 pb-1'>
                        条件確認
                    </span>
                    { tab == 2 && 
                        <div className='absoulte bottom-0 border-b-4 border-main'></div>
                    }
                </div>
            </div>
            <div className='px-10 py-10 bg-p-sub'>
                {content}
                <div className='flex justify-between mt-4'>
                    <div>
                        <BaseButton onClick={onClickCancel}>キャンセル</BaseButton>
                    </div>
                    <div>
                        <BaseButton onClick={onClickRegister}>作成</BaseButton>
                    </div>
                </div>
            </div>
        </>
    )
}