import {Menu} from '@mui/material';

import React from 'react';

const StyledMenu = ({
  children,
  id,
  anchorEL,
  onClose,
}: {
  children: React.ReactNode;
  id?: string | undefined;
  anchorEL: HTMLElement | null;
  onClose?: () => void;
}) => {
  const open = Boolean(anchorEL);

  return (
    <Menu
      id={id}
      anchorEl={anchorEL}
      open={open}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
    >
      {children}
    </Menu>
  );
};

export default StyledMenu;
