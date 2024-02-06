import { useMemo, useState } from 'react';

export type PageInfo = {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    hasPages: boolean;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export const usePagenation = () => {

    const [page, setPage] = useState<number>(1);
    const [pageInfo, setPageInfo] = useState<PageInfo>();

    const nextPage = () => {
        setPage(page+1);
    }

    const previousPage = () => {
        setPage(page-1);
    }

    const pageCount = useMemo(() => {
        console.log(pageInfo)
        if (!pageInfo) {
            return null;
        }
        return pageInfo.lastPage;
    }, [pageInfo])

    const hasPages = () : boolean => {
        if (!pageInfo) {
            return false;
        }
        return pageInfo.hasPages;
    }

    const hasNextPage = () : boolean => {
        if (!pageInfo) {
            return false;
        }
        return pageInfo.hasNextPage;
    }

    const hasPreviousPage = () => {
        if (!pageInfo) {
            return false;
        }
        return pageInfo.hasPreviousPage;
    }

    return { 
        page, 
        setPageInfo, 
        nextPage, 
        previousPage, 
        hasPages,
        hasNextPage, 
        hasPreviousPage, 
        pageCount
    };
}
