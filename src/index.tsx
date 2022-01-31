import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotesPage from './routes/NotesPage';
import ArchivePage from './routes/ArchivePage';
import TrashPage from './routes/TrashPage';
import SettingsPage from './routes/SettingsPage';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import './i18n';
import store from './store'
import { NotesThemeProvider } from './context/ThemeContext';
import CustomSnackbarProvider from './snackbars/CustomSnackbarProvider';
import AppLoading from './components/AppLoading';
import AuthProvider from './components/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotesThemeProvider>
        <CssBaseline />

        <CustomSnackbarProvider>

          <BrowserRouter>

            <AuthProvider>
              <Suspense fallback={<AppLoading />}>
                <App />
              </Suspense>
            </AuthProvider>

          </BrowserRouter>
        </CustomSnackbarProvider>
      </NotesThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
