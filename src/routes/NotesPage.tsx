import React from 'react'
import NotesController from '../components/NotesController';
import PageContainer from '../components/PageContainer/PageContainer';
import { useTranslation } from 'react-i18next';

const NotesPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t('title.allNotes')}>
      <NotesController />
    </PageContainer>
  );
}

export default NotesPage
