import React, { useCallback, useEffect, useState } from 'react';
import NoteTitleField from '../NoteTitleField';
import NoteBodyField from '../NoteBodyField';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';
import api from '../../api';
import { useSnackbar } from 'notistack';

export interface NoteDetailsProps {
  note: INote;
}

type FieldType = 'title' | 'body';

const NoteDetails: React.FC<NoteDetailsProps> = ({ note }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const handleDebouncedUpdate = (field: FieldType, value: string) => {
    const updateNote: IUpdateNote = { ...note };

    // Update field
    updateNote[field] = value;

    api.put(`/Notes`, updateNote)
      .then((result) => {
        // TODO: dispatch redux status update or something
      })
      .catch((e) => {
        enqueueSnackbar(t('snack.update.error'), {
          variant: 'error'
        });
      });
  }

  const debounceUpdate = useCallback(debounce(handleDebouncedUpdate, 700), []);

  const handleChange = (field: FieldType) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;

    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'body':
        setBody(value);
        break;
    }

    debounceUpdate(field, value);
  }

  return (
    <div>
      <NoteTitleField
        placeholder={t('form.note.placeholder.title')}
        value={title}
        onChange={handleChange('title')}
      />
      <br />
      <NoteBodyField
        multiline
        placeholder={t('form.note.placeholder.body')}
        value={body}
        onChange={handleChange('body')}
      />
    </div>
  );
};

export default NoteDetails;
