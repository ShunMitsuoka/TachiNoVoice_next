import React from 'react';
import { Grid } from 'react-loader-spinner'

interface Props {
    isShow: boolean;
}

export const PageLoading: React.FC<Props> = ({
    isShow,
}) => {
    return (
        <>
            { isShow &&
                <div className='fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-50 bg-slate-800 bg-opacity-60'>
                    <Grid 
                        height="100"
                        width="100"
                        color='#f8fafc'
                    />
                    <div className='mt-4 text-slate-100 text-3xl'>
                        Now Loading...
                    </div>
                </div>          
            }
        </>
    )
}