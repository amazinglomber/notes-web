import React from 'react'
import NotesController from '../components/NotesController';
import { Typography } from '@mui/material';
import PageContainer from '../components/PageContainer/PageContainer';
import { useTranslation } from 'react-i18next';

const NotesPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Typography variant="h4" color="primary">{t('title.allNotes')}</Typography>
      <br />
      <NotesController />
    </PageContainer>
  );
}

export default NotesPage
