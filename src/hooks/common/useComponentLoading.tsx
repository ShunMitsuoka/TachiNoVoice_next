
import { ComponentLoading } from '@/components/templates/common/loading/componentLoading';
import { useState } from 'react';


export const useComponentLoading = (initState : boolean = false) => {

  const [ isShow, setLoading ] = useState(initState);

  const show = () => {
    setLoading(true);
  }

  const close = () => {
    setLoading(false);
  }

  const loadingComponent = (loadingText : string) => {
      return <ComponentLoading isShow={isShow} loadingText={loadingText} />;
  }

  const displayComponent = (component : React.ReactNode) => {
    return (
        <>
        {
            !isShow && component
        }
        </>
    )
}

  return {isShow, show, close, loadingComponent, displayComponent};
}
