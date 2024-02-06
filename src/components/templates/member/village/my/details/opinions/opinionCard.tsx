import { GenderIcon } from '@/components/modules/common/gender/gender';
import React, { useState } from 'react';
import { MemberDetail, Opinion } from 'villageType';
import { EvaluationComponet } from './evaluationComponet';
import { RiThumbUpFill } from "react-icons/ri";
import { RiThumbDownFill } from "react-icons/ri";
import { RiQuestionFill } from "react-icons/ri";
import { appConst } from '@/app/const/appConst';
import { useModal } from '@/hooks/common/useModal';
import nl2br from 'react-nl2br';

interface Props {
    villageId: Number;
    opinion: Opinion;
    myDetails?:MemberDetail;
    reload?: () => void;
    canEvaluation? : boolean; 
    isShowEvaluation? : boolean; 
}

const opinionLength = 40;

export const OpinionCard: React.FC<Props> = ({
    villageId,
    opinion,
    myDetails,
    reload,
    canEvaluation,
    isShowEvaluation,
}) => {
    const modal = useModal();

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

    const evaluationIcon = () => {
        const evaluation = mySelfEvaluation();
        if(evaluation == undefined){
            return null;
        }
        switch (evaluation) {
            case appConst.village.evaluation.good:
                return <RiThumbUpFill className="text-sub text-xl" />;
            case appConst.village.evaluation.bad:
                return <RiThumbDownFill className="text-sub text-xl" />;
            case appConst.village.evaluation.uncertain:
                return <RiQuestionFill className="text-sub text-xl" />;
            default:
                break;
        }
    }

    const countEvaluation = (type : number) => {
        let count = 0;
        if(opinion.evaluations){
            opinion.evaluations.forEach((evaluation) => {
                if(evaluation.value == type) count++;
            });
        }
        return count;
    }

    return (
        <>
            {
                modal.content(                    
                    <div>
                        <div className='w-full bg-white rounded-lg shadow-md overflow-hidden'>
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
                            <div className='px-2 py-2 text-sm text-left'>
                                {nl2br(opinion.opinion)}
                            </div>
                        </div>
                    </div>
                )
            }
            <div className=' bg-white rounded-lg shadow-md overflow-hidden' onClick={modal.show}>
                <div className='relative flex items-center px-2 py-1 bg-core'>
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
                    {
                        !isShowEvaluation && 
                        <div className='absolute right-4 flex'>
                            {evaluationIcon()}
                        </div>
                    }
                    {
                        isShowEvaluation && 
                        <div className='absolute right-4 flex'>
                            <div className='flex justify-center items-center ml-2'>
                                <RiThumbUpFill />
                                <span className='ml-1'>
                                    {countEvaluation(appConst.village.evaluation.good)}
                                </span>
                            </div>
                            <div className='flex justify-center items-center ml-2'>
                                <RiThumbDownFill />
                                <span className='ml-1'>
                                    {countEvaluation(appConst.village.evaluation.bad)}
                                </span>
                            </div>
                            <div className='flex justify-center items-center ml-2'>
                                <RiQuestionFill />
                                <span className='ml-1'>
                                    {countEvaluation(appConst.village.evaluation.uncertain)}
                                </span>
                            </div>
                        </div>
                    }
                </div>
                <div className='px-2 py-2 text-sm text-left'>
                    {nl2br(slicedOpinion())}
                </div>
            </div>
        </>
    )
}