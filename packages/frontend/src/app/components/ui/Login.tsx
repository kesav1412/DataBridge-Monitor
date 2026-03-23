'use client';
import { Box, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';

export default function LoginUser() {
    const theme = useTheme();
    return (
        <Box className="login-user" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <Typography variant="body1" fontWeight={500} color="text.primary">John Doe</Typography>
            <AccountCircle sx={{ width: 30, height: 30, color: theme.typography.subtitle1}} />
        </Box>
    );
}