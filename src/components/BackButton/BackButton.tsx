import React from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export interface BackButtonProps extends IconButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  }

  return (
    <Tooltip title={t('toolbar.tooltip.back') as string}>
      <IconButton
        color="inherit"
        onClick={onClick ? onClick : handleBackClick}
        {...props}
      >
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BackButton;
