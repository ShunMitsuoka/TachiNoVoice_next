import { GenderIcon } from '@/components/modules/common/gender/gender';
import React, { useState } from 'react';

interface Props {
    name: string;
    age?: number;
    gender?: number;
    opinion?: string;
}

const opinionLength = 40;

export const OpinionCard: React.FC<Props> = ({
    name,
    age,
    gender,
    opinion
}) => {

    const [open, setOpen] = useState(false);

    const slicedOpinion = () => {
        if (opinion && opinion.length > opinionLength) {
            return opinion.substring(0, opinionLength) + '...';
        }
        return opinion;
    }

    return (
        <>
            {
                open &&
                <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full px-4 bg-slate-800 bg-opacity-60 z-10' onClick={() => setOpen(false)}>
                    <div className=' bg-white rounded-lg drop-shadow overflow-hidden' onClick={() => setOpen(true)}>
                        <div className='flex items-center px-2 py-1 bg-core'>
                            {
                                gender &&
                                <div className='flex justify-center items-center mr-2'>
                                    <GenderIcon gender={gender} />
                                </div>
                            }
                            <div>
                                {name}
                            </div>
                            {
                                age &&
                                <div className='ml-1'>
                                    ({age})
                                </div>
                            }
                        </div>
                        <div className='px-2 py-2 text-sm'>
                            {opinion}
                        </div>
                    </div>
                </div>
            }
            <div className=' bg-white rounded-lg drop-shadow overflow-hidden' onClick={() => setOpen(true)}>
                <div className='flex items-center px-2 py-1 bg-core'>
                    {
                        gender &&
                        <div className='flex justify-center items-center mr-2'>
                            <GenderIcon gender={gender} />
                        </div>
                    }
                    <div>
                        {name}
                    </div>
                    {
                        age &&
                        <div className='ml-1'>
                            ({age})
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