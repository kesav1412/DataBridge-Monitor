'use client';

import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { alpha } from '@mui/material/styles';

interface DataBoxProps {
  label: string;
  data: string | number;
  percentage: string;
  icon: ReactNode;
}

export default function DataBox({
  label,
  data,
  percentage,
  icon,
}: DataBoxProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 2.5,
        bgcolor: 'background.paper',
        transition: 'all 0.2s ease',

        '&:hover': {
          boxShadow: (theme) =>
            `4px 4px 12px ${theme.palette.action.hover}`,
        },
      }}
    >
      {/* Top-right icon */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          color: 'text.disabled',
        }}
      >
        {icon}
      </Box>

      {/* Label */}
      <Typography
        variant="subtitle1"
        sx={{
          textTransform: 'uppercase',
          mb: 1,
        }}
      >
        {label}
      </Typography>

      {/* Data */}
      <Typography
        sx={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'text.primary',
          mb: 1,
        }}
      >
        {data}
      </Typography>

      {/* Percentage */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
         <Typography
            sx={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'success.main',
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                p: '8px',
                borderRadius: 0.5,
            }}
            >
            {percentage}
        </Typography>
        <Typography
          variant="subtitle1"
          fontSize={12}
        >
          from last week
        </Typography>
      </Box>
    </Box>
  );
}
