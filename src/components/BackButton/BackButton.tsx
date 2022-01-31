import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  }

  return (
    <Tooltip title={t('toolbar.tooltip.back') as string}>
      <IconButton
        color="inherit"
        onClick={handleBackClick}
      >
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BackButton;
