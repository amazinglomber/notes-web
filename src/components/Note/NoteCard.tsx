import { CardContent, CardProps, Typography, Card, CardActionArea, ImageListItem } from '@mui/material';
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
          xs: 2,
          sm: 3,
        }
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
            variant="h5"
            component="div"
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {note.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {note.body}
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
