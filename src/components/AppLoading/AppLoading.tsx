import React from 'react';
import Loading from '../Loading';
import { Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

export interface AppLoadingProps {}

const AppLoading: React.FC<AppLoadingProps> = () => {
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
      <DescriptionIcon sx={{ fontSize: 60 }} />
      <Loading />
    </Box>
  );
};

export default AppLoading;
