import { useState } from 'react';

export const usePageLoading = () => {
  const [isPageLaoding, setPageLaoding] = useState(false);

  const show = () => {
    setPageLaoding(true);
  }

  const close = () => {
    setPageLaoding(false);
  }

  return {isPageLaoding, show, close};
}
