import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface BackButtonProps {
  href: string;
}

const BackButton = ({ href }: BackButtonProps) => {
  return (
    <Link href={href} passHref>
      <Box
        component="a"
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: '#000',
          textDecoration: 'none',
          mb: 2,
        }}
      >
        <ArrowBackIcon sx={{ mr: 1 }} />
        <Typography
          sx={{
            fontWeight: 'bold',
            position: 'relative',
            '& .underline': {
              content: '""',
              position: 'absolute',
              bottom: -2,
              left: 0,
              width: '0%',
              height: '2px',
              backgroundColor: '#000',
              transition: 'width 0.2s ease-in-out',
            },
            '&:hover .underline': {
              width: '100%',
            },
          }}
        >
          Back
          <Box className="underline" sx={{ width: '0%' }} />
        </Typography>
      </Box>
    </Link>
  );
};

export default BackButton;
