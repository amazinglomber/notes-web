import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
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
    <>
      <Card
        sx={{
          width: '100%',
          mb: 2,
        }}
        elevation={1}
        onClick={handleOnNoteClick}
      >
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">{note.title}</Typography>
            <Typography variant="body2">{note.body.substring(0, 100)}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <NoteFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        note={note}
      />
    </>
  );
};

export default React.memo(NoteListItem, );
