import React from 'react';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';
import NoteCard from '../Note/NoteCard';
import useNotesTheme from '../../context/themeHooks';
import { Box } from '@mui/material';

export interface CardGridProps {
  notes: INote[];
}

const CardGrid: React.FC<CardGridProps> = ({ notes }) => {
  const { theme } = useNotesTheme();

  return (
    <Box
      sx={{
        columns: '4 240px',
        columnGap: {
          xs: 2,
          sm: 3,
        },
        pb: 1,
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

export default CardGrid;
