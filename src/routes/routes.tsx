import { RouteObject, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import NotesPage from './NotesPage';
import ArchivePage from './ArchivePage';
import TrashPage from './TrashPage';
import SettingsPage from './SettingsPage';
import LoginLayout from '../components/LoginLayout';

const routes = (isLoggedIn: boolean): RouteObject[] => [
  {
    path: '/app',
    // if user is logged in, load the layout, otherwise redirect to root
    element: isLoggedIn ? <Layout /> : <Navigate to="/" />,
    children: [
      { path: '', element: <Navigate to="/app/notes" /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'archive', element: <ArchivePage /> },
      { path: 'trash', element: <TrashPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ]
  },
  {
    path: '/',
    // if user is NOT logged in, load the login layout, otherwise redirect to /app
    element: !isLoggedIn ? <LoginLayout /> : <Navigate to="/app" />,
  }
];

export default routes;
