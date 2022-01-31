import { Archive, Delete, Notes, Settings } from '@mui/icons-material';
import {
  Button, Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Toolbar,
  useMediaQuery, Zoom
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useNotesTheme from '../../context/themeHooks';
import i18n from '../../i18n';
import NoteFormDialog from '../Dialogs/NoteFormDialog';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNavigationDrawerOpened } from '../../store/selectors';
import { appSlice } from '../../store/reducers/appReducer';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';
import { NavBarOffset } from '../NavBar/NavBar';

export const drawerWidth = 280;

interface IRoute {
  name: string;
  icon: JSX.Element;
  to: string;
  divider?: boolean;
}

const routes: IRoute[] = [
  {
    name: 'nav.notes',
    icon: <DescriptionIcon />,
    to: '/',
    divider: true,
  },
  // {
  //   name: 'nav.labels',
  //   icon: <LabelIcon />,
  //   to: '/labels',
  // },
  {
    name: 'nav.archive',
    icon: <Archive />,
    to: '/archive',
  },
  {
    name: 'nav.trash',
    icon: <Delete />,
    to: 'trash',
  },
  {
    name: 'nav.settings',
    icon: <Settings />,
    to: '/settings',
  },
];

const NavigationDrawer = () => {
  const { t } = useTranslation();
  const { mode, toggleDark, theme } = useNotesTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const drawerOpen = useAppSelector(selectNavigationDrawerOpened);

  // temporary
  const [lang, setLang] = useState('en');
  const [dialogOpen, setDialogOpen] = useState(false);

  const matchesDesktop = useMatchesDesktop();

  const handleAddNoteClicked = () => {
    setDialogOpen(true);
  };

  const handleDrawerClose = () => {
    dispatch(appSlice.actions.setDrawerOpen(false))
  };

  const handleNavItemClicked = (route: IRoute) => () => {
    navigate(route.to);
    handleDrawerClose();
    dispatch(appSlice.actions.setNavBarTitle(route.name));
  };

  return (
    <>
      <Drawer
        variant={matchesDesktop ? 'permanent' : 'temporary'}
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth
        }}
      >
        {/* Add note button */}
        {matchesDesktop && (
          <>
            <NavBarOffset />
            <Button
              variant="contained"
              size="large"
              style={{
                margin: 16,
              }}
              onClick={handleAddNoteClicked}
            >
              {t('nav.addnote')}
            </Button>
          </>
        )}

        <List sx={{ width: drawerWidth }}>
          {routes.map((route) => (
            <div key={`nav-item-${route.name}`}>
              <ListItem
                button
                onClick={handleNavItemClicked(route)}
                selected={location.pathname === route.to}
              >
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText>{t(route.name)}</ListItemText>
              </ListItem>

              {route.divider && <Divider />}
            </div>
          ))}

          {/* Dark mode toggle */}
          {/* TODO: Move it to settings page */}
          <ListItem>
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <ListItemText>{t('nav.darkmode')}</ListItemText>
            <Switch
              edge="end"
              checked={mode === 'dark'}
              onChange={() => toggleDark()}
            />
          </ListItem>

          {/* Debug language select */}
          {/* TODO: Move it to settings page */}
          <ListItem>
            <ListItemText>Language</ListItemText>
            <Switch
              edge="end"
              onChange={() => {
                const newLang = lang === 'pl' ? 'en' : 'pl';
                setLang(newLang);
                i18n.changeLanguage(newLang);
              }}
            />
          </ListItem>
        </List>
      </Drawer>

      {/* Render FAB only on mobile and only on Notes page */}
      {!matchesDesktop && (
        <Zoom
          in={location.pathname === '/'}
          unmountOnExit
        >
          <Fab
            color="primary"
            sx={{
              zIndex: theme.zIndex.modal - 1,
              position: 'fixed',
              bottom: theme.spacing(2),
              right: theme.spacing(2),
            }}
            onClick={handleAddNoteClicked}
          >
            <EditIcon />
          </Fab>
        </Zoom>
      )}

      <NoteFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default NavigationDrawer;
