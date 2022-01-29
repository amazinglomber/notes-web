import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface INotesState {
  notes: INote[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  selectedNotesIds: INote['id'][];
}

const initialState: INotesState = {
  notes: [],
  status: 'idle',
  error: undefined,
  selectedNotesIds: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<INote>) {
      state.notes.push(action.payload);
    },
    switchArchiveNote(state, action: PayloadAction<INote['id']>) {
      const note = state.notes.find((note) => note.id === action.payload);

      if (note) {
        note.isArchived = !note.isArchived;
      }
    },
    switchArchiveSelectedNotes(state) {
      state.notes.forEach((note) => {
        if (state.selectedNotesIds.includes(note.id)) {
          note.isArchived = !note.isArchived;
        }
      });
      state.selectedNotesIds = [];
    },
    removeNote(state, action: PayloadAction<INote['id'] | INote['id'][]>) {
      // if (Array.isArray(action.payload)) {
      //   state.notes = state.notes.filter((note) => !action.payload.includes(note.id));
      // } else {
      //   state.notes = state.notes.filter((note) => note.id !== action.payload);
      // }
    },
    removeSelectedNotes(state) {
      state.notes = state.notes.filter((note) => !state.selectedNotesIds.includes(note.id))
      state.selectedNotesIds = [];
    },
    selectNote(state, action: PayloadAction<INote['id']>) {
      const selectedNote = state.notes.find((note) => note.id === action.payload);

      if (selectedNote) {
        state.selectedNotesIds.push(selectedNote.id);
      }
    },
    selectAllNotes(state) {
      state.selectedNotesIds = state.notes.map((note) => note.id);
    },
    deselectNote(state, action: PayloadAction<INote['id']>) {
      state.selectedNotesIds = state.selectedNotesIds.filter((id) => id !== action.payload);
    },
    deselectAllNotes(state) {
      state.selectedNotesIds = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = state.notes.concat(action.payload);
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const notes: INote[] = (await response.json()).slice(0, 10).map((p: any) => ({
    id: nanoid(),
    title: p.title,
    body: p.body,
    // labels: ['label 1', 'label 2']
  }));

  return notes;
});

export const {
  addNote,
  removeNote,
  removeSelectedNotes,
  switchArchiveNote,
  switchArchiveSelectedNotes,
  selectNote,
  selectAllNotes,
  deselectNote,
  deselectAllNotes
} = notesSlice.actions;

export default notesSlice.reducer;
