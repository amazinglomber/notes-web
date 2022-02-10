import { Card, CardActionArea, CardContent, CardProps, Typography } from '@mui/material';
import React, { useState } from 'react'
import NoteFormDialog from '../Dialogs/NoteFormDialog';
import { NoteColors } from '../../theme';

interface NoteCardProps extends CardProps {
  note: INote;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, ...params }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOnNoteClick = () => {
    setDialogOpen(true);
  };

  return (
    <Card
      sx={{
        bgcolor: NoteColors[note.color],
        mb: {
          xs: 1,
          sm: 2,
        },
        transform: 'translateZ(0)',
      }}
      {...params}
    >
      <CardActionArea
        onClick={handleOnNoteClick}
        sx={{
          height: 1,
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'stretch',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {note.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {note.body.substring(0, 300)}
            {note.body.length > 300 && '...'}
          </Typography>
        </CardContent>
      </CardActionArea>

      <NoteFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        note={note}
      />
    </Card>
  );
};

export default NoteCard;
