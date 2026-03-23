'use client';

import { Box, Typography } from '@mui/material';
import AppBreadcrumbs from '@/app/components/Breadcrumbs/AppBreadcrumbs';
import { KeyValue, LoginUser } from '@/app/components/ui';
import FormTable from '@/app/components/FormTable';

export default function FormPage() {
  return (
    <Box>
      <Box p={5} sx={{ '.login-user': { justifyContent: 'flex-end' } }}>
        <LoginUser />
      </Box>

      <Box sx={{ height: '1px', backgroundColor: 'divider' }} />

      <Box p={5}>
        <AppBreadcrumbs
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Customer Registration Form', active: true },
          ]}
        />

        <Typography variant="h3" fontWeight={600} mb={1}>
          Customer Registration Form
        </Typography>

        <Typography variant="subtitle1">
          Detailed performance monitoring and synchronization history logs
        </Typography>
      </Box>

      <Box px={5} pb={5}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          <KeyValue label="Total Sync" value="1000" />
          <KeyValue label="Success" value="500" valueColor="success.main" />
          <KeyValue label="Failed" value="500" valueColor="error.main" />
          <KeyValue label="Success Rate" value="50%" valueColor="primary.main"/>
        </Box>
      </Box>

      <Box px={5} pb={5}>
        <FormTable />
      </Box>
    </Box>
  );
}
