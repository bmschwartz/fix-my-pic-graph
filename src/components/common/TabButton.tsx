import { Badge, Button } from '@mui/material';
import React from 'react';

interface TabButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  badgeContent?: string;
}

const TabButton: React.FC<TabButtonProps> = ({ text, selected, onClick, badgeContent }) => {
  return (
    <Button
      variant={selected ? 'contained' : 'outlined'}
      color={selected ? 'primary' : 'inherit'}
      onClick={onClick}
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 150 }}
    >
      {text}
      {badgeContent && (
        <Badge
          badgeContent={badgeContent}
          color="secondary"
          sx={{ ml: 1 }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        />
      )}
    </Button>
  );
};

export default TabButton;
