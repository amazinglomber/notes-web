import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducers/appReducer';
import notesReducer from './reducers/notesReducer';
import { notesApi } from '../api/api';

const store = configureStore({
  reducer: {
    app: appReducer,
    notes: notesReducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApi.middleware),
});

export default store;
