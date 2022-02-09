import React from 'react'
import NotesController from '../components/NotesController';
import PageContainer from '../components/PageContainer/PageContainer';
import { useTranslation } from 'react-i18next';

const ArchivePage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t('nav.archive')}>
      <NotesController archive />
    </PageContainer>
  )
}

export default ArchivePage
