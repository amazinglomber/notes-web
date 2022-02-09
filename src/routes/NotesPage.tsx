import React from 'react'
import NotesController from '../components/NotesController';
import { Typography } from '@mui/material';
import PageContainer from '../components/PageContainer/PageContainer';
import { useTranslation } from 'react-i18next';
import useMatchesDesktop from '../hooks/useMatchesDesktop';

const NotesPage = () => {
  const { t } = useTranslation();

  const matchesDesktop = useMatchesDesktop();

  return (
    <PageContainer title={t('title.allNotes')}>
      <NotesController />
    </PageContainer>
  );
}

export default NotesPage
