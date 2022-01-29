import React, { useEffect, useState } from 'react'
import { Button, Chip, Container, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getNoteById } from '../store/selectors';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import { switchArchiveNote, removeNote } from '../store/reducers/notesReducer';
import { useTranslation } from 'react-i18next';
import api from '../api';
import { SnackbarKey, useSnackbar } from 'notistack';
import ActionDismiss from '../snackbars/ActionDismiss';

const NoteDetailsPage = () => {
  const { noteId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [note, setNote] = useState<INote | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

  // TODO: Add snackbar message
  const onArchiveClicked = () => archiveNote();

  // TODO: Add confirmation dialog and snackbar message
  const onRemoveClicked = () => deleteNote();

  // If note is not found, redirect user to notes page
  // if (!note) {
  //   return (
  //     <Navigate to="/notes" replace />
  //   );
  // }

  return (
    <div>
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
                <IconButton onClick={onArchiveClicked}>
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

      <Container component="main">
        {loading && <h3>loading</h3>}
        {error && <h3>Error</h3>}
        {!!note && (
          <>
            <Typography variant="h4" gutterBottom>{note!.title}</Typography>
            <Typography variant="body1">{note!.body}</Typography>
            <br />
            {/*<Stack direction="row" spacing={1}>*/}
            {/*  {note!.labels.map((label) => (*/}
            {/*    <Chip key={`label-${label}`} label={label} />*/}
            {/*  ))}*/}
            {/*</Stack>*/}
          </>
        )}
      </Container>
    </div>
  )
}

export default NoteDetailsPage;

