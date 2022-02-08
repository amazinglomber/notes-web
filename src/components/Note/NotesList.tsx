import React from 'react'
import NoteListItem from './NoteListItem';
import { Box, ImageList } from '@mui/material';
import NoteCard from './NoteCard';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';

interface NotesListProps {
  notes: INote[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  const matchesDesktop = useMatchesDesktop();

  return (
    <ImageList
      sx={{
        m: 2
      }}
      cols={matchesDesktop ? 3 : 2}
      gap={2}
    >
      {notes.map((note) => (
        <NoteCard
          key={`${note.isArchived ? 'archived-' : ''}note-list-item-${note.id}`}
          note={note}
        />
      ))}
    </ImageList>
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
