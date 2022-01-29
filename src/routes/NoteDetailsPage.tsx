import React, { useEffect, useState } from 'react'
import { Container, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import api from '../api';
import { useSnackbar } from 'notistack';
import NoteTitleField from '../components/NoteTitleField';
import NoteBodyField from '../components/NoteBodyField';
import NoteDetails from '../components/NoteDetails';

const NoteDetailsPage = () => {
  const { noteId } = useParams();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [note, setNote] = useState<INote | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const getNote = async () => {
    setLoading(true);
    try {
      const response = await api.get<INote>(`/Notes/${noteId}`);
      setNote(response.data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  const archiveNote = async () => {
    try {
      const response = await api.post(`/Notes/${noteId}/Archive`);

      if (response.status === 204) {
        enqueueSnackbar(t('snack.archive.success'));
        navigate(-1);
      }
    } catch (e) {
      enqueueSnackbar(t('snack.archive.error'), {
        variant: 'error',
        preventDuplicate: true
      });
    }
  };

  const unArchiveNote = async () => {
    try {
      const response = await api.post(`/Notes/${noteId}/UnArchive`);

      if (response.status === 204) {
        enqueueSnackbar(t('snack.unarchive.success'));
        navigate(-1);
      }
    } catch (e) {
      enqueueSnackbar(t('snack.unarchive.error'), {
        variant: 'error',
        preventDuplicate: true
      });
    }
  };

  const deleteNote = async () => {
    try {
      const response = await api.delete(`/Notes/${noteId}`);

      if (response.status === 204) {
        enqueueSnackbar(t('snack.delete.success'));
        navigate(-1);
      }
    } catch (e) {
      enqueueSnackbar(t('snack.delete.error'), { variant: 'error' });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const onArchiveClicked = () => archiveNote();

  const onUnArchiveClicked = () => unArchiveNote();

  const onRemoveClicked = () => deleteNote();

  const renderToolbar = () => (
    <Toolbar>
      <Tooltip title={t('toolbar.tooltip.back') as string}>
        <IconButton
          color="inherit"
          onClick={handleBackClick}
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>

      {!!note && (
        <>
          {!note.isArchived ? (
            <Tooltip title={t('toolbar.tooltip.archive') as string}>
              <IconButton onClick={onArchiveClicked}>
                <ArchiveIcon/>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title={t('toolbar.tooltip.unarchive') as string}>
              <IconButton onClick={onUnArchiveClicked}>
                <UnarchiveIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}

      <Tooltip title={t('toolbar.tooltip.delete') as string}>
        <IconButton onClick={onRemoveClicked}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );

  return (
    <div>
      {renderToolbar()}

      <Container component="main">
        {loading && <h3>loading</h3>}
        {error && <h3>Error</h3>}
        {!!note && (
          <NoteDetails note={note!} />
        )}
      </Container>
    </div>
  )
}

export default NoteDetailsPage;

