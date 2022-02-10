import React from 'react';
import NoteCard from './NoteCard';
import { Box } from '@mui/material';

export interface CardGridProps {
  notes: INote[];
}

const NotesGrid: React.FC<CardGridProps> = ({ notes }) => {
  return (
    <Box
      sx={{
        columns: {
          xs: '2 165px',
          sm: '4 240px'
        },
        columnGap: {
          xs: 1,
          sm: 2,
        },
        pt: 2,
        pb: 1,
        px: 8,
        overflow: 'visible'
      }}
    >
      {notes.map((note) => (
        <NoteCard
          key={`${note.isArchived ? 'archived-' : ''}note-list-item-${note.id}`}
          note={note}
        />
      ))}
    </Box>
  );
};

export default NotesGrid;
