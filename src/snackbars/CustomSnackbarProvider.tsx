import React from 'react';
import { SnackbarKey, SnackbarProvider, SnackbarProviderProps } from 'notistack';
import ActionDismiss from './ActionDismiss';

export interface CustomSnackbarProviderProps extends SnackbarProviderProps {

}

const CustomSnackbarProvider: React.FC<CustomSnackbarProviderProps> = ({ children, ...props }) => {
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
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
