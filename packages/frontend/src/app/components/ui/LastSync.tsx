'use client';

import { Box, Typography } from "@mui/material";
import { History } from "@mui/icons-material";

export default function LastSync() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, backgroundColor: 'divider', padding: '10px 16px', borderRadius: '8px' }} >
            <History sx={{ color: 'primary.main', fontSize: 25 }} />
            <Typography fontWeight={500} color="text.primary">
                LAST SYNC: 2 MINS AGO
            </Typography>
        </Box>
    );
}