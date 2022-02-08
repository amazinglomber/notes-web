import React from 'react'
import NotesController from '../components/NotesController';
import PageContainer from '../components/PageContainer/PageContainer';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ArchivePage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Typography variant="h4" color="primary">{t('title.archivedNotes')}</Typography>
      <br />
      <NotesController archive />
    </PageContainer>
  )
}

export default ArchivePage
