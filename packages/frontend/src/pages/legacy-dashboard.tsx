import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
	Container,
	Box,
	Typography,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	CircularProgress,
	Alert,
	Chip,
	Avatar,
	Divider,
} from '@mui/material';
import { Person, Email } from '@mui/icons-material';

interface User {
	id: number;
	name: string;
	email: string;
}

export default function LegacyDashboard() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/users');

			if (!response.ok) {
				throw new Error('Failed to fetch users');
			}

			const data = await response.json();
			setUsers(data.users);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Admin Dashboard</title>
				<meta name="description" content="Admin Dashboard with Next.js and MUI" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box
				component="main"
				sx={{
					minHeight: '100vh',
					py: 8,
					background: 'linear-gradient(to bottom, #0a0a0a, #1a1a1a)',
				}}
			>
				<Container maxWidth="lg">
					<Typography
						variant="h1"
						component="h1"
						gutterBottom
						sx={{
							textAlign: 'center',
							background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							mb: 4,
						}}
					>
						Admin Dashboard
					</Typography>

					<Card
						sx={{
							borderRadius: 3,
						}}
					>
						<CardContent>
							<Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
								<Typography variant="h2" component="h2" sx={{ flexGrow: 1 }}>
									Users
								</Typography>
								<Chip label={`${users.length} users`} color="primary" size="small" />
							</Box>

							<Divider sx={{ mb: 2 }} />

							{loading && (
								<Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
									<CircularProgress />
								</Box>
							)}

							{error && (
								<Alert severity="error" sx={{ mb: 2 }}>
									{error}
								</Alert>
							)}

							{!loading && !error && (
								<List>
									{users.map((user, index) => (
										<Box key={user.id}>
											<ListItem
												sx={{
													borderRadius: 2,
													mb: 1,
													transition: 'all 0.2s',
													'&:hover': {
														backgroundColor: 'rgba(59, 130, 246, 0.08)',
														transform: 'translateX(8px)',
													},
												}}
											>
												<Avatar
													sx={{
														mr: 2,
														bgcolor: 'primary.main',
													}}
												>
													<Person />
												</Avatar>
												<ListItemText
													primary={
														<Typography variant="body1" fontWeight={600}>
															{user.name}
														</Typography>
													}
													secondary={
														<Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
															<Email sx={{ fontSize: 16, mr: 0.5 }} />
															<Typography variant="body2" color="text.secondary">
																{user.email}
															</Typography>
														</Box>
													}
												/>
											</ListItem>
											{index < users.length - 1 && <Divider variant="inset" />}
										</Box>
									))}
								</List>
							)}
						</CardContent>
					</Card>
				</Container>
			</Box>
		</>
	);
}
