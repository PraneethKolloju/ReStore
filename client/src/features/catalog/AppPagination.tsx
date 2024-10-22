import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../../app/models/Pagination";
import { useState } from "react";

interface Props {
    metaData: MetaData,
    onPageChange: (page: number) => void;
}


export default function AppPagination({ metaData, onPageChange }: Props) {
    const { pageSize, totalCount, totalPages, currentPage } = metaData;
    const [pageNumber, setPageNumber] = useState(currentPage);

    function handlePageChange(page: number) {
        setPageNumber(page);
        onPageChange(page);
    }
    return (
        <>
            <Box display='flex' alignContent="center" justifyContent="space-between">
                <Typography variant='body1'>
                    Displaying {(currentPage - 1) * pageSize + 1}-
                    {currentPage * pageSize > totalCount!
                        ? totalCount
                        : currentPage * pageSize
                    } of {totalCount} results
                </Typography>
                <Pagination
                    color='secondary'
                    size='large'
                    count={totalPages}
                    page={pageNumber}
                    onChange={(_e, page) => handlePageChange(page)}
                />
            </Box>
        </>
    )
}