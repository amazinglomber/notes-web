import { RootState } from '../hooks';

// Unfortunate naming
export const selectSelectedNotes = (state: RootState) =>
  state.notes.selectedNotes;

export const selectIsNoteSelected = (noteId: INote['id']) =>
  (state: RootState) => state.notes.selectedNotes.includes(noteId);

