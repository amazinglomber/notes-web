
import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';

export interface PageContainerProps {
  title?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  const matchesDesktop = useMatchesDesktop();

  return (
    <Box
      sx={{
        py: {
          xs: 2,
          sm: 4,
        },
        px: {
          xs: 1,
          sm: 4,
        },
      }}
    >
      {(!!title && matchesDesktop) && (
        <Typography
          variant="h4"
          color="primary"
          sx={{ mb: 4 }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  )
}

export default PageContainer;
