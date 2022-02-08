
import React from 'react';
import { Box, styled } from '@mui/material';

export interface PageContainerProps {}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        padding: {
          xs: 2,
          sm: 4,
        },
      }}
    >
      {children}
    </Box>
  )
}

export default PageContainer;
