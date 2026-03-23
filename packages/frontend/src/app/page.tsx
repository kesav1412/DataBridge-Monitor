import { Bolt } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';
import { DataBox, LoginUser } from './components/ui';
import SyncActions from './components/SyncActions';

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'space-between',
          p: 5,
          borderBottom: '1px solid #ecdcd7',
        }}
      >
        <Typography variant="h4" fontWeight={500}>
          Dashboard
        </Typography>

        <SyncActions />
      </Box>

      <Box sx={{ p: 5 }}>
        <DataBox
          label="Total Triggers"
          data="1,284"
          percentage="+12%"
          icon={<Bolt />}
        />
      </Box>
    </Box>
  );
}
