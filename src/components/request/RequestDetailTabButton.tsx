import { Box, SxProps } from '@mui/material';
import React from 'react';

import { FMPButton } from '@/components';

interface RequestDetailTabButtonProps {
  sx?: SxProps;
  title: string;
  onClick: () => void;
  badgeNumber?: number;
}

const RequestDetailTabButton: React.FC<RequestDetailTabButtonProps> = ({ sx, title, onClick }) => {
  return (
    <Box sx={sx}>
      <FMPButton type="button" variant="contained" color="primary" onClick={onClick}>
        {title}
      </FMPButton>
    </Box>
  );
};

export default RequestDetailTabButton;
