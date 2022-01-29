import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './reducers/notesReducer';
import labelsReducer from './reducers/labelsReducer';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    labels: labelsReducer,
  }
});

export default store;
