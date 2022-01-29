import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface ConfirmationDialogProps extends DialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ title, description, onConfirm, onCancel, ...other }) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          {t('dialog.cancel')}
        </Button>
        <Button onClick={handleConfirm}>
          {t('dialog.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
