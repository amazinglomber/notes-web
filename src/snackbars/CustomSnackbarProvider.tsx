import React from 'react';
import { SnackbarKey, SnackbarProvider, SnackbarProviderProps } from 'notistack';
import ActionDismiss from './ActionDismiss';

export interface CustomSnackbarProviderProps extends SnackbarProviderProps {

}

const CustomSnackbarProvider: React.FC<CustomSnackbarProviderProps> = ({ children, ...props }) => {
  // const matchesDesktop = useMatchesDesktop();
  // const theme = useTheme();

  const notistackRef = React.createRef<any>();

  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key);
  }

  const action = (key: SnackbarKey) => {
    return (
      <>
        <ActionDismiss onClick={onClickDismiss(key)} />
      </>
    );
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      anchorOrigin={{
        vertical: 'bottom',
          horizontal: 'left',
      }}
      maxSnack={1}
      action={action}
      // style={{
      //   ...(!matchesDesktop && {
      //     marginBottom: theme.spacing(8)
      //   })
      // }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
