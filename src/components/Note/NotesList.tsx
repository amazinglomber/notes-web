import React from 'react'
import NoteListItem from './NoteListItem';
import { Box } from '@mui/material';

interface NotesListProps {
  notes: INote[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  return (
    <Box
      sx={{
        m: 2
      }}
    >
      {notes.map((note) => (
        <NoteListItem
          key={`${note.isArchived ? 'archived-' : ''}note-list-item-${note.id}`}
          note={note}
        />
      ))}
    </Box>
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
