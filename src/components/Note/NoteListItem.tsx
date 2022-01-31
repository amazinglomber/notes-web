import React, { useState } from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import NoteFormDialog from '../Dialogs/NoteFormDialog';

export interface NoteListItemProps {
  note: INote;
}

const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOnNoteClick = () => {
    setDialogOpen(true);
  };

  return (
    <ListItem
      disablePadding
    >
      <ListItemButton onClick={handleOnNoteClick}>
        <ListItemText primary={note.title} secondary={note.body.substring(0, 100) + '...'} />
      </ListItemButton>

      <NoteFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        note={note}
      />
    </ListItem>
  );
};

export default React.memo(NoteListItem, );
