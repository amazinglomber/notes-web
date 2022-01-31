import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './reducers/notesReducer';
import labelsReducer from './reducers/labelsReducer';
import appReducer from './reducers/appReducer';

const store = configureStore({
  reducer: {
    app: appReducer,
    notes: notesReducer,
    labels: labelsReducer,
  }
});

export default store;
