import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface INotesState {
  // selectedNotes: { [key: INote['id']]: boolean },
  selectedNotes: INote['id'][],
}

const initialState: INotesState = {
  // selectedNotes: { },
  selectedNotes: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    toggleSelectNote(state, action: PayloadAction<INote['id']>) {
      if (state.selectedNotes.includes(action.payload)) {
        state.selectedNotes = state.selectedNotes.filter((n) => n !== action.payload);
      } else {
        state.selectedNotes.push(action.payload);
      }
    },
    deselectAllNotes(state) {
      state.selectedNotes = [];
    }
  },
});

export default notesSlice.reducer;
