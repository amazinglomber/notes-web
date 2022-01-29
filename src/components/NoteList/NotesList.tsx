import {
  Card,
  CardContent,
  Checkbox, Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText, Stack,
  Typography
} from '@mui/material';
import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deselectNote, fetchNotes, selectNote } from '../../store/reducers/notesReducer';
import { getAllNotes, getNotesStatus, getSelectedNotesIds } from '../../store/selectors';
import NoteCard from '../NoteCard/NoteCard';
import { useNavigate } from 'react-router-dom';

interface NotesListProps {
  notes: INote[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  const dispatch = useAppDispatch();
  const selectedNotesIds = useAppSelector(getSelectedNotesIds);

  const navigate = useNavigate();

  const handleOnNoteCheck = (value: INote['id']) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      dispatch(selectNote(value));
    } else {
      dispatch(deselectNote(value));
    }
  }

  const handleOnNoteClick = (id: INote['id']) => () => {
    navigate(`/notes/${id}`);
  }

  return (
    <List>
      {notes.map((note) => (
        <ListItem
          key={`${note.isArchived ? 'archived-' : ''}note-list-item-${note.id}`}
          disablePadding
        >
          <ListItemIcon>
            <Checkbox
              checked={selectedNotesIds.includes(note.id)}
              onChange={handleOnNoteCheck(note.id)}
            />
          </ListItemIcon>
          <ListItemButton onClick={handleOnNoteClick(note.id)}>
            <ListItemText primary={note.title} secondary={note.body.substring(0, 100) + '...'} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  // TODO: Better list items
//   return (
//     <List sx={{ width: '100%' }}>
//       {notes.map((note) => (
//         <ListItem sx={{ width: '100%' }}>
//           <Card sx={{ width: '100%' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>{note.title}</Typography>
//               <Typography variant="body2" gutterBottom>{note.body.substring(0, 100) + '...'}</Typography>
//               <Stack direction="row" spacing={1}>
//                 {note.labels.map((label) => (
//                   <Chip size="small" label={label} />
//                 ))}
//               </Stack>
//             </CardContent>
//           </Card>
//         </ListItem>
//
//       ))}
//     </List>
//   );
}

export default NotesList;
