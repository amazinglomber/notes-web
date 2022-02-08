import { Typography } from '@mui/material'
import React from 'react'
import PageContainer from '../components/PageContainer/PageContainer';
import { useTranslation } from 'react-i18next';

const TrashPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Typography variant="h4" color="primary">{t('nav.trash')}</Typography>
      <br />
    </PageContainer>
  );
};

export default TrashPage
