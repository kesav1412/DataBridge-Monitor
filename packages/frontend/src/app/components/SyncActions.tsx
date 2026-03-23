'use client';

import { Box } from '@mui/material';
import { LastSync, SyncButton, LoginUser } from './ui';

export default function SyncActions() {
  const handleSync = () => {
    console.log('Syncing...');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <LastSync />
      <SyncButton
        label="SYNC NOW"
        onClick={handleSync}
      />
      <LoginUser />
    </Box>
  );
}