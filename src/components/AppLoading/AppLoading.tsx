import React from 'react';
import Loading from '../Loading';
import { Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

export interface AppLoadingProps {
  withLogo?: boolean;
}

const AppLoading: React.FC<AppLoadingProps> = ({ withLogo = false }) => {
  return (
    <Box
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {withLogo && <DescriptionIcon sx={{ fontSize: 60 }} />}
      <Loading />
    </Box>
  );
};

export default AppLoading;
