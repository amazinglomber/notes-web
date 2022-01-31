import React, { useCallback, useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  debounce,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps, IconButton, Toolbar, Tooltip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import NoteForm from '../Note/NoteForm';
import useNotesTheme from '../../context/themeHooks';
import BackButton from '../BackButton';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useAddNoteMutation,
  useArchiveNoteMutation,
  useGetNoteByIdQuery,
  useRemoveNoteMutation, useUnArchiveNoteMutation,
  useUpdateNoteMutation
} from '../../api/api';

export interface NoteFormDialogProps extends DialogProps {
  onClose: () => void;
  note? :INote;
}

const NoteFormDialog: React.FC<NoteFormDialogProps> = ({ note, onClose, ...props }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [noteId, setNoteId] = useState(note?.id);

  const { theme } = useNotesTheme();
  const matchesDesktop = useMatchesDesktop();

  const [
    addNote,
  ] = useAddNoteMutation();

  const [
    updateNote,
  ] = useUpdateNoteMutation();

  const [
    removeNote,
  ] = useRemoveNoteMutation();

  const [
    archiveNote,
  ] = useArchiveNoteMutation();

  const [
    unArchiveNote,
  ] = useUnArchiveNoteMutation();

  useEffect(() => {
    setNoteId(note?.id);
  }, []);

  const handleDebounceChange = (createNote: ICreateNote) => {
    console.log('debounces', createNote);

    if (!noteId) {
      addNote(createNote)
        .unwrap()
        .then((note) => {
          setNoteId(note.id);
        })
        .catch((rejected) => {
          enqueueSnackbar(t('snack.note.create.error'), {
            preventDuplicate: true,
          });
        });
    } else {
      updateNote({
        ...createNote,
        id: noteId,
      })
        .unwrap()
        .then((_) => {})
        .catch((rejected) => {
          enqueueSnackbar(t('snack.note.update.error'), {
            preventDuplicate: true,
          });
        });
    }
  }

  const debounceChange = useCallback(debounce(handleDebounceChange, 700), [noteId]);

  const handleOnNoteChange = (createNote: ICreateNote) => {
    console.log('handleNoteChange', createNote);
    debounceChange(createNote);
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleArchive = () => {
    if (noteId) {
      handleCancel();
      archiveNote(noteId)
        .unwrap()
        .then(() => {
          enqueueSnackbar(t('snack.archive.success'), {
            preventDuplicate: true,
          });
        })
        .catch((e) => {
          enqueueSnackbar(t('snack.archive.error'), {
            preventDuplicate: true,
          });
        });
    }
  };

  const handleUnArchive = () => {
    if (noteId) {
      handleCancel();
      unArchiveNote(noteId)
        .unwrap()
        .then(() => {
          enqueueSnackbar(t('snack.unarchive.success'), {
            preventDuplicate: true,
          });
        })
        .catch((e) => {
          enqueueSnackbar(t('snack.unarchive.error'), {
            preventDuplicate: true,
          });
        });
    }
  };

  const handleDelete = () => {
    if (noteId) {
      handleCancel();
      removeNote(noteId)
        .unwrap()
        .then(() => {
          enqueueSnackbar(t('snack.remove.success'), {
            preventDuplicate: true,
          });
        })
        .catch((e) => {
          enqueueSnackbar(t('snack.remove.error'), {
            preventDuplicate: true,
          });
        });
    }
  };

  const renderToolbar = () => !!noteId && (
    <>
      {/* Archive button */}
      {(!!note && note.isArchived) ? (
        <Tooltip title={t('tooltip.unarchive') as string}>
          <IconButton onClick={handleUnArchive}>
            <UnarchiveIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={t('tooltip.archive') as string}>
          <IconButton onClick={handleArchive}>
            <ArchiveIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* Delete button */}
      <Tooltip title={t('tooltip.delete') as string}>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const renderAppBarOnMobile = () => (
    !matchesDesktop && (
      <AppBar
        color="transparent"
        elevation={0}
        sx={{ position: 'relative' }}
      >
        <Toolbar disableGutters sx={{ marginX: 1 }}>
          <BackButton onClick={onClose} />

          {/* used for making icons appear on the right */}
          <div style={{ display: 'flex', flex: 1 }}/>

          {renderToolbar()}

        </Toolbar>
      </AppBar>
    )
  );

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      fullScreen={!matchesDesktop}
      onClose={onClose}
      {...props}
    >
      {renderAppBarOnMobile()}

      <DialogContent sx={{ padding: 2 }}>
        <NoteForm note={note} onChange={handleOnNoteChange} />
      </DialogContent>

      {matchesDesktop && (
        <DialogActions>

          {renderToolbar()}

          {/* used for making icons appear on the left */}
          <div style={{ display: 'flex', flex: 1 }}/>

          {/* Close button */}
          <Button autoFocus onClick={handleCancel}>
            {t('dialog.close')}
          </Button>

        </DialogActions>
      )}
   </Dialog>
  );
};

export default NoteFormDialog;
