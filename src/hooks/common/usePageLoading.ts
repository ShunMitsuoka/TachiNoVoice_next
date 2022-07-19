import { useState } from 'react';

export const usePageLoading = () => {
  const [isPageLaoding, setPageLaoding] = useState(false);
  return {isPageLaoding, setPageLaoding};
}
