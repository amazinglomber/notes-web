import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface ILabelsState {
  labels: ILabel[];
}

const initialState: ILabelsState = {
  labels: [
    { id: 'xd1', label: 'label 1'},
    { id: 'xd2', label: 'label 2'},
  ],
}

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    addLabel(state, action: PayloadAction<ICreateLabel>) {
      const label: ILabel = {
        id: nanoid(),
        ...action.payload,
      };
      state.labels.push(label);
    },
    removeLabel(state, action: PayloadAction<ILabel['id']>) {
      state.labels = state.labels.filter((label) => label.id !== action.payload);
    }
  }
});

export const {} = {...labelsSlice.actions};

export default labelsSlice.reducer;
