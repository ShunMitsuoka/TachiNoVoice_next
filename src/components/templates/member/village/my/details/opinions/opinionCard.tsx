import { GenderIcon } from '@/components/modules/common/gender/gender';
import React, { useState } from 'react';
import { MemberDetail, Opinion } from 'villageType';
import { EvaluationComponet } from './evaluationComponet';

interface Props {
    villageId: Number;
    opinion: Opinion;
    myDetails?:MemberDetail;
    reload?: () => void;
}

const opinionLength = 40;

export const OpinionCard: React.FC<Props> = ({
    villageId,
    opinion,
    myDetails,
    reload,
}) => {

    const [open, setOpen] = useState(false);

    const slicedOpinion = () : string => {
        if (opinion.opinion && opinion.opinion.length > opinionLength) {
            return opinion.opinion.substring(0, opinionLength) + '...';
        }
        return opinion.opinion;
    }

    const mySelfEvaluation = () => {
        if(!myDetails || !opinion.evaluations){
            return undefined;
        }
        const evaluations = opinion.evaluations;
        for (let index = 0; index < evaluations.length; index++) {
            const evaluation = evaluations[index];
            if(evaluation.user_id == myDetails.user_id){
                return evaluation.value;
            }
        }
        return undefined;
    }

    return (
        <>
            {
                open &&
                <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full px-4 bg-slate-800 bg-opacity-60 z-10' onClick={() => setOpen(false)}>
                    <div className='w-full'>
                        <div className='w-full bg-white rounded-lg shadow-md overflow-hidden' onClick={() => setOpen(true)}>
                            <div className='flex items-center px-2 py-1 bg-core'>
                                {
                                    opinion.member.gender &&
                                    <div className='flex justify-center items-center mr-2'>
                                        <GenderIcon gender={opinion.member.gender} />
                                    </div>
                                }
                                <div>
                                    {opinion.member.nickname}
                                </div>
                                {
                                    opinion.member.age &&
                                    <div className='ml-1'>
                                        ({opinion.member.age})
                                    </div>
                                }
                            </div>
                            <div className='px-2 py-2 text-sm'>
                                {opinion.opinion}
                            </div>
                        </div>
                        {
                            myDetails && reload &&
                            <EvaluationComponet opinion={opinion} mySelfEvaluation={mySelfEvaluation()} villageId={villageId} reload={reload} />
                        }
                    </div>
                </div>
            }
            <div className=' bg-white rounded-lg shadow-md overflow-hidden' onClick={() => setOpen(true)}>
                <div className='flex items-center px-2 py-1 bg-core'>
                    {
                        opinion.member.gender &&
                        <div className='flex justify-center items-center mr-2'>
                            <GenderIcon gender={opinion.member.gender} />
                        </div>
                    }
                    <div>
                        {opinion.member.nickname}
                    </div>
                    {
                        opinion.member.age &&
                        <div className='ml-1'>
                            ({opinion.member.age})
                        </div>
                    }
                </div>
                <div className='px-2 py-2 text-sm'>
                    {slicedOpinion()}
                </div>
            </div>
        </>
    )
}