import React, { useCallback, useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  debounce,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps, Toolbar,
  useMediaQuery
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import api from '../../api';
import { useSnackbar } from 'notistack';
import NoteForm from '../Note/NoteForm';
import useNotesTheme from '../../context/themeHooks';
import BackButton from '../BackButton';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';

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

  useEffect(() => {
    setNoteId(note?.id);
  }, []);

  const addNote = (createNote: ICreateNote) => {
    console.log('create note');

    api.post<INote>(`/Notes`, createNote)
      .then((response) => {
        console.log('response', response.data);
        setNoteId(response.data.id);
      })
      .catch((e) => {
        enqueueSnackbar(t('snack.create.error'), {
          preventDuplicate: true
        });
      });
  };

  const updateNote = (updateNote: IUpdateNote) => {
    console.log('update note');

    api.put(`/Notes`, updateNote)
      .then((response) => {})
      .catch((e) => {
        enqueueSnackbar(t('snack.update.error'), {
          preventDuplicate: true
        });
      });
  };

  const handleDebounceChange = (createNote: ICreateNote) => {
    console.log('debounces', createNote);

    if (!noteId) {
      addNote(createNote);
    } else {
      updateNote({
        ...createNote,
        id: noteId,
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

  };

  const handleDelete = () => {

  };

  const renderAppBarOnMobile = () => (
    !matchesDesktop && (
      <AppBar
        color="transparent"
        elevation={0}
        sx={{ position: 'relative' }}
      >
        <Toolbar disableGutters sx={{ marginX: 1 }}>
          <BackButton onClick={onClose} />
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
          {/* TODO: Add archive and delete button */}
          <Button autoFocus onClick={handleCancel}>
            {t('dialog.close')}
          </Button>
        </DialogActions>
      )}
   </Dialog>
  );
};

export default NoteFormDialog;
