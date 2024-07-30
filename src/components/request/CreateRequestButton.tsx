import { Box, SxProps } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { FMPButton } from '@/components';

interface CreateRequestButtonProps {
  sx?: SxProps;
}

const CreateRequestButton: React.FC<CreateRequestButtonProps> = ({ sx }) => {
  return (
    <Box sx={sx}>
      <Link href="/request/new" passHref>
        <FMPButton type="button" variant="contained" color="primary">
          Create Request
        </FMPButton>
      </Link>
    </Box>
  );
};

export default CreateRequestButton;
