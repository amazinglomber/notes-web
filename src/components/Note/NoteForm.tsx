import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NoteTitleField from './NoteTitleField';
import NoteBodyField from './NoteBodyField';

export interface NoteDetailsProps {
  note?: INote;
  onChange: (createNote: ICreateNote) => void;
}

type FieldType = 'title' | 'body';

const NoteForm: React.FC<NoteDetailsProps> = ({ note, onChange }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState(note?.title ?? '');
  const [body, setBody] = useState(note?.body ?? '');

  const handleChange = (field: FieldType) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;

    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'body':
        setBody(value);
    }

    const createNote: ICreateNote = {
      title,
      body,
    };
    createNote[field] = value;
    onChange(createNote);
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

export default NoteForm;
