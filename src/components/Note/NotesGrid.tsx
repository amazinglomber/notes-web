import React from 'react';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';
import NoteCard from './NoteCard';
import useNotesTheme from '../../context/themeHooks';
import { Box } from '@mui/material';

export interface CardGridProps {
  notes: INote[];
}

const NotesGrid: React.FC<CardGridProps> = ({ notes }) => {
  const { theme } = useNotesTheme();

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
        pb: 1,
        // Hack to fix shadow being cropped on sides.
        mx: '2px',
      }}
    >
      <Box>
        {notes.map((note) => (
          <NoteCard
            key={`${note.isArchived ? 'archived-' : ''}note-list-item-${note.id}`}
            note={note}
          />
        ))}
      </Box>
    </Box>
  );
};

export default NotesGrid;
