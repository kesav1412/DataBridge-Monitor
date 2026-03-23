'use client';

import { Button, Typography } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

interface SyncButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function SyncButton({
  label,
  onClick,
  disabled = false,
}: SyncButtonProps) {
  return (
    <Button
      variant="contained"
      startIcon={<SyncIcon sx={{ fontSize: 25 }} />}
      onClick={onClick}
      disabled={disabled}
      sx={{
        textTransform: 'none',
        borderRadius: '8px',
        px: '16px',
        py: '10px',
        gap: 1,
      }}
    >
      <Typography fontWeight={500}>
        {label}
      </Typography>
    </Button>
  );
}
