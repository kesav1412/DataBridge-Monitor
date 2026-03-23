'use client';

import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Typography,
  useTheme,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TablePagination from './TablePagination';

interface SyncRecord {
  id: string;
  timestamp: string;
  date: string;
  records: number;
  status: 'success' | 'failed' | 'syncing';
  details: string;
}

const mockData: SyncRecord[] = [
  {
    id: '1',
    timestamp: '12:20:30 PM',
    date: 'Wed, 12/01/2026',
    records: 50,
    status: 'success',
    details: 'All records processed successfully',
  },
  {
    id: '2',
    timestamp: '12:20:30 PM',
    date: 'Wed, 12/01/2026',
    records: 60,
    status: 'syncing',
    details: 'Processing in background',
  },
  {
    id: '3',
    timestamp: '12:20:30 PM',
    date: 'Wed, 12/01/2026',
    records: 50,
    status: 'failed',
    details: 'Connection timed out',
  },
  {
    id: '4',
    timestamp: '12:20:30 PM',
    date: 'Wed, 12/01/2026',
    records: 50,
    status: 'success',
    details: 'All records processed successfully',
  },
  {
    id: '5',
    timestamp: '12:20:30 PM',
    date: 'Wed, 12/01/2026',
    records: 50,
    status: 'success',
    details: 'All records processed successfully',
  },
];

const statusColors: Record<string, { color: 'success' | 'error' | 'warning'; label: string }> = {
  success: { color: 'success', label: 'success' },
  failed: { color: 'error', label: 'Failed' },
  syncing: { color: 'warning', label: 'Syncing' },
};

export default function FormTable() {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'failed' | 'syncing'>('all');

  const filterButtons = ['All', 'Success', 'Failed', 'Syncing'];

  const filteredData = mockData.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  return (
    <Box
      sx={{
        width: '100%',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {filterButtons.map((btn) => (
            <Button
              key={btn}
              variant={filterStatus === btn.toLowerCase() ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterStatus(btn.toLowerCase() as typeof filterStatus)}
              sx={{
                px: 2.5,
                py: 1,
                borderColor: filterStatus === btn.toLowerCase() ? undefined : theme.palette.neutral,
                backgroundColor:
                  filterStatus === btn.toLowerCase() ? theme.palette.primary.main : 'transparent',
                color: filterStatus === btn.toLowerCase() ? 'white' : theme.palette.neutral,
                textTransform: 'capitalize',
                fontSize: '16px',
                borderRadius: 0.5,
                '&:hover': {
                  backgroundColor:
                    filterStatus === btn.toLowerCase()
                      ? theme.palette.primary.main
                      : theme.palette.neutral + '14',
                  borderColor: filterStatus === btn.toLowerCase() ? undefined : theme.palette.neutral,
                },
              }}
            >
              {btn}
            </Button>
          ))}
        </Box>

        <Button
          variant="outlined"
          size="small"
          startIcon={<CalendarTodayIcon sx={{ fontSize: '18px' }} />}
          sx={{
            borderColor: theme.palette.neutral,
            color: theme.palette.neutral,
            textTransform: 'uppercase',
            fontSize: '13px',
            px: 3,
            py: 1.5,
            '&:hover': {
              backgroundColor: theme.palette.neutral + '14',
              borderColor: theme.palette.neutral,
            },
          }}
        >
          Today
        </Button>
      </Box>

      <TableContainer
        sx={{
          border: 'none',
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: theme.palette.divider,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                TIMESTAMP
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }} align="center">
                RECORDS
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }} align="center">
                STATUS
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                DETAILS
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }} align="center">
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.neutral + '14',
                    cursor: 'pointer'
                  },
                }}
              >
                <TableCell sx={{ py: 2 }}>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: 'text.primary' }}>
                    {row.timestamp}
                  </Typography>
                  <Typography variant="subtitle1">
                    {row.date}
                  </Typography>
                </TableCell>

                <TableCell align="center" sx={{ py: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>{row.records}</Typography>
                </TableCell>

                <TableCell align="center" sx={{ py: 2 }}>
                  <Chip
                    label={statusColors[row.status].label}
                    color={statusColors[row.status].color}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      color: 'white',
                    }}
                  />
                </TableCell>

                <TableCell sx={{ py: 2, color: theme.palette[statusColors[row.status].color].main }}>
                  <Typography variant="subtitle1" sx={{ color: 'inherit' }}>{row.details}</Typography>
                </TableCell>

                <TableCell align="center" sx={{ py: 2 }}>
                  <Button
                    size="small"
                    sx={{
                      color: 'primary.main',
                      textTransform: 'capitalize',
                      p: 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    <Typography variant="subtitle1">
                      View Records
                    </Typography>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        totalRecords={filteredData.length}
      />
    </Box>
  );
}
