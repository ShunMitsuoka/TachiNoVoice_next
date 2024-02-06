import React from 'react';
import { ThreeDots } from 'react-loader-spinner'

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
                    <ThreeDots 
                        height="70" 
                        width="70" 
                        radius="4"
                        color="#A26749" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                    />
                    </div>
                </div>          
            }
        </>
    )
}