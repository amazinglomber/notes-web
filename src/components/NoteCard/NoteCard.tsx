import { CardContent, CardProps, Typography, Card, CardActionArea } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

interface NoteCardProps extends CardProps {
  note: INote;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, ...params }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <Card {...params}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {note.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {note.body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NoteCard;
