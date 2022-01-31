import { RootState } from './hooks';

export const selectNavigationDrawerOpened = (state: RootState) =>
  state.app.navigationDrawerOpened;

export const getAllNotes = (state: RootState) =>
  state.notes.notes.filter((note) => !note.isArchived);

export const getNoteById = (id: INote["id"]) => (state: RootState) =>
  state.notes.notes.find((note) => note.id === id);

export const getAllArchivedNotes = (state: RootState) =>
  state.notes.notes.filter((note) => note.isArchived);

// export const getAllNotesWithLabel = (labelId: ILabel['id']) => (state: RootState) =>
//   state.notes.notes.filter((note) => note.labels.includes(labelId));

export const getNotesStatus = (state: RootState) => state.notes.status;

export const getSelectedNotesIds = (state: RootState) => state.notes.selectedNotesIds;

export const howManyNotesSelected = (state: RootState) => {
  const notesLen = state.notes.notes.length
  const selectedLen = state.notes.selectedNotesIds.length;

  if (selectedLen === 0) {
    return 'none';
  } else if (selectedLen < notesLen) {
    return 'some';
  }

  return 'all';
};

export const getAllLabels = (state: RootState) => state.labels.labels;
