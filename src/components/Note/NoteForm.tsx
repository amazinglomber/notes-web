import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NoteTitleField from './NoteTitleField';
import NoteBodyField from './NoteBodyField';
import { FormControl, FormHelperText } from '@mui/material';

export interface NoteDetailsProps {
  note?: INote;
  onChange: (createNote: ICreateNote) => void;
}

type FieldType = 'title' | 'body';

const NoteForm: React.FC<NoteDetailsProps> = ({ note, onChange }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState(note?.title ?? '');
  const [body, setBody] = useState(note?.body ?? '');

  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const handleChange = (field: FieldType) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;

    let error = false;

    switch (field) {
      case 'title':
        if (value.length <= 200) {
          setTitle(value);
        } else {
          setTitleError(true);
          error = true;
        }

        break;
      case 'body':
        if (body.length <= 2000) {
          setBody(value);
        } else {
          setBodyError(true);
          error = true;
        }

        break;
    }

    if (!error) {
      const createNote: ICreateNote = {
        title,
        body,
      };
      createNote[field] = value.substring(0, field === 'title' ? 200 : 2000);
      onChange(createNote);
    }
  }

  return (
    <div>
      <FormControl
        variant="standard"
        fullWidth
        error={titleError}
      >
        <NoteTitleField
          placeholder={t('form.note.placeholder.title')}
          value={title}
          onChange={handleChange('title')}
        />
        <FormHelperText>
          {titleError && t('form.note.validationError.title')}
        </FormHelperText>
      </FormControl>

      <br />

      <FormControl
        variant="standard"
        fullWidth
        error={bodyError}
      >
        <NoteBodyField
          multiline
          fullWidth
          placeholder={t('form.note.placeholder.body')}
          value={body}
          onChange={handleChange('body')}
        />
        <FormHelperText>
          {bodyError && t('form.note.validationError.body')}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default NoteForm;
