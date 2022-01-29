import { CircularProgress } from '@mui/material';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
