import { Theme, useMediaQuery } from '@mui/material';

const useMatchesDesktop = () => {
  const matchesDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return matchesDesktop;
};

export default useMatchesDesktop;
