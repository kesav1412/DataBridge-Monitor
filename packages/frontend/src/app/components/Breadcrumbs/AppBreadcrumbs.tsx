'use client';

import { Breadcrumbs, Typography, Link } from '@mui/material';
import NextLink from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type BreadcrumbItem = {
  label: string;
  href?: string;
  active?: boolean;
};

interface Props {
  items: BreadcrumbItem[];
}

export default function AppBreadcrumbs({ items }: Props) {
  return (
    <Breadcrumbs
      separator={
        <ChevronRightIcon fontSize="small" sx={{color: "text.secondary"}} />
      }
      sx={{
        mb: 4,
      }}
    >
      {items.map((item, index) =>
        item.active ? (
          <Typography
            key={index}
            color="text.primary"
            sx={{ fontWeight: 400 }}
          >
            {item.label}
          </Typography>
        ) : item.href ? (
          <Link
            key={index}
            component={NextLink}
            href={item.href}
            underline="none"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            {item.label}
          </Link>
        ) : (
          <Typography
            key={index}
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
}
