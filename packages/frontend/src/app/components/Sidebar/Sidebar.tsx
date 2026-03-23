'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    Paper,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Sync as SyncIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export default function LambdaSyncSidebar() {
    const pathname = usePathname() ?? '';
    const router = useRouter();

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: DashboardIcon,
            href: '/',
        },
        {
            id: 'sync-history',
            label: 'Sync History',
            icon: SyncIcon,
            href: '/sync-history',
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: SettingsIcon,
            href: '/settings',
        },
    ];

    return (
        <Paper
            elevation={2}
            sx={{
                width: 280,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRadius: 0,
                height: '100vh',
                borderRight: '1px solid #ecdcd7',
                position: 'fixed',
                top: 0,
                left: 0,
            }}
            >
                <Box
                    sx={{
                        padding: '24px 20px',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: 'primary.main',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <SwapHorizIcon
                                sx={{ color: 'primary.contrastText', fontSize: 30 }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                }}
                            >
                                Lambda Sync
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: 500,
                                }}
                            >
                                Monitor
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <List
                    sx={{
                        padding: '16px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                        flex: 1,
                    }}
                >
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;

                        const isSelected =
                            item.id === 'dashboard'
                                ? pathname === '/' || pathname.startsWith('/form')
                                : pathname.startsWith(item.href);


                        const isSettings = item.id === 'settings';
                        const isSyncHistory = item.id === 'sync-history';

                        return (
                            <Box key={item.id}>
                                <ListItem
                                    onClick={() => router.push(item.href)}
                                    sx={{
                                        cursor: 'pointer',
                                        borderRadius: '8px',
                                        padding: '10px 16px',
                                        transition: 'all 0.2s ease',
                                        mt: isSettings ? '24px' : 0,
                                        mb: isSyncHistory ? '24px' : 0,
                                        bgcolor: isSelected ? 'action.hover' : 'transparent',
                                        '&:hover': {
                                            bgcolor: '#F9F9F9',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: '40px',
                                            color: isSelected ? 'primary.main' : 'text.secondary',
                                        }}
                                    >
                                        <IconComponent sx={{ fontSize: '20px' }} />
                                    </ListItemIcon>

                                    <ListItemText
                                        primary={item.label}
                                        sx={{
                                            '& .MuiTypography-root': {
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                color: isSelected ? 'primary.main' : 'text.primary',
                                            },
                                        }}
                                    />
                                </ListItem>

                                {isSyncHistory && (
                                    <Box
                                        sx={{
                                            height: '1px',
                                            backgroundColor: '#ecdcd7',
                                            mx: 2,
                                        }}
                                    />
                                )}
                            </Box>
                        );
                    })}
                </List>
            </Paper>
    );
}
