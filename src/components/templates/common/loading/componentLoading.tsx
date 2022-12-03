import React from 'react';
import { Rings } from 'react-loader-spinner'

interface Props {
    isShow: boolean;
    loadingText? : string;
}

export const ComponentLoading: React.FC<Props> = ({
    isShow,
    loadingText = '読み込み中...'
}) => {
    return (
        <>
            { isShow &&
                <div className='relative flex flex-col justify-center items-center py-6 '>
                    <div className={' font-bold'}>
                        {loadingText}
                    </div>
                    <div>
                        <Rings
                            height="80"
                            width="80"
                            color="#A26749"
                            radius="6"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="rings-loading"
                        />
                    </div>
                </div>          
            }
        </>
    )
}