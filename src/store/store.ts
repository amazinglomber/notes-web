import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducers/appReducer';
import { notesApi } from '../api/api';

const store = configureStore({
  reducer: {
    app: appReducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApi.middleware),
});

export default store;
