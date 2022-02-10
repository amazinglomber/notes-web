import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import NotesPage from './NotesPage';
import ArchivePage from './ArchivePage';
import LoginPage from './LoginPage';
import AppLoading from '../components/AppLoading';

// Lazy pages
const MainApp = React.lazy(() => import('../components/Layout'));
const SettingsPage = React.lazy(() => import('./SettingsPage'));

const routes = (isLoggedIn: boolean): RouteObject[] => [
  {
    path: '/app',
    // if user is logged in, load the layout, otherwise redirect to root
    element: isLoggedIn
      ? (
        <React.Suspense fallback={<AppLoading />}>
          <MainApp />
        </React.Suspense>
      )
      : <Navigate to="/" />,
    children: [
      { path: '', element: <Navigate to="/app/notes" /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'archive', element: <ArchivePage /> },
      // { path: 'trash', element: <TrashPage /> },
      {
        path: 'settings',
        element: (
          <React.Suspense fallback={<AppLoading />}>
            <SettingsPage />
          </React.Suspense>
        )
      },
    ]
  },
  {
    path: '/',
    // if user is NOT logged in, load the login layout, otherwise redirect to /app
    element: !isLoggedIn ? <LoginPage /> : <Navigate to="/app" />,
  }
];

export default routes;
