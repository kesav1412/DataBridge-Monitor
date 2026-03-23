'use client';

import { Typography, Box } from '@mui/material';

interface KeyValueProps {
  label: string;
  value: string;
  valueColor?: string;
}

export default function KeyValue({
  label,
  value,
  valueColor = 'text.primary',
}: KeyValueProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
        borderRadius: '12px',
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="h4"
        fontWeight={600}
        color={valueColor}
        sx={{
          wordBreak: 'break-word',
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
