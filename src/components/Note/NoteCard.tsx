import { Card, CardActionArea, CardContent, CardProps, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react'
import NoteFormDialog from '../Dialogs/NoteFormDialog';
import { NoteColors } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectIsNoteSelected } from '../../store/selectors/noteSelectors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { notesSlice } from '../../store/reducers/notesReducer';
interface NoteCardProps extends CardProps {
  note: INote;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, ...params }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const isSelected = useAppSelector(selectIsNoteSelected(note.id));
  const dispatch = useAppDispatch();

  const handleOnNoteClick = () => {
    setDialogOpen(true);
  };

  const handleSelect = () => {
    dispatch(notesSlice.actions.toggleSelectNote(note.id));
  };

  return (
    <Card
      sx={[
        {
          bgcolor: NoteColors[note.color],
          mb: {
            xs: 1,
            sm: 2,
          },
          // Hack to fix shadow being cropped on sides.
          transform: 'translateZ(0)',
          overflow: 'visible',

          "&:hover": {
            "& .selectNoteButton": {
              opacity: 1,
            }
          }
        },
        (theme) => isSelected ? ({
          // border
          boxShadow: `0 0 0 2px ${theme.palette.mode === 'light' ? 'black' : 'white'}`,
        }) : {},
      ]}
      {...params}
    >
      <IconButton
        className="selectNoteButton"
        sx={{
          position: 'absolute',
          ml: '-16px',
          mt: '-16px',
          // ml: '-10px',
          // mt: '-10px',
          zIndex: 2137,
          opacity: !isSelected ? 0 : 1,
          transition: 'opacity 0.218s linear',
        }}
        onClick={handleSelect}
      >
        <CheckCircleIcon
          sx={[
            {
              backgroundPosition: 'center',
              backgroundSize: '8px 8px',
              borderRadius: '50%',
              // color: 'black',
              // fill: 'pink',
            },
            (theme) => isSelected ? {
              backgroundColor: theme.palette.mode === 'light'
                ? theme.palette.common.white
                : theme.palette.common.black,
              color: theme.palette.mode === 'light'
                ? theme.palette.common.black
                : theme.palette.common.white,
            } : {},
          ]}
        />
      </IconButton>
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
