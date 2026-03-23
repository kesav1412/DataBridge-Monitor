'use client';

import {
  TablePagination as MuiTablePagination,
  useTheme,
} from '@mui/material';

interface TablePaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
  totalRecords: number;
}

export default function TablePagination({
  currentPage,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalRecords,
}: TablePaginationProps) {
  const theme = useTheme();

  return (
    <MuiTablePagination
      rowsPerPageOptions={[5, 10, 25, 50]}
      component="div"
      count={totalRecords}
      rowsPerPage={rowsPerPage}
      page={currentPage - 1}
      onPageChange={(event, newPage) => onPageChange(newPage + 1)}
      onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
      sx={{
        '& .MuiTablePagination-toolbar': {
          borderTop: `1px solid ${theme.palette.divider}`,
          py: 2,
        },
        '& .MuiTablePagination-selectLabel': {
          color: 'text.secondary',
          fontSize: '14px',
        },
        '& .MuiTablePagination-displayedRows': {
          color: 'text.secondary',
          fontSize: '14px',
        },
        '& .MuiSelect-standard': {
          fontSize: '14px',
        },
      }}
    />
  );
}
