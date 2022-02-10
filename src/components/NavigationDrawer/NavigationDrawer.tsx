import { Archive, Settings } from '@mui/icons-material';
import {
  Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Zoom
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import useNotesTheme from '../../context/themeHooks';
import NoteFormDialog from '../Dialogs/NoteFormDialog';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNavigationDrawerOpened } from '../../store/selectors/appSelectors';
import { appSlice } from '../../store/reducers/appReducer';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth0 } from '@auth0/auth0-react';

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
    to: '/app/notes',
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
    to: '/app/archive',
  },
  // {
  //   name: 'nav.trash',
  //   icon: <Delete />,
  //   to: '/app/trash',
  // },
  {
    name: 'nav.settings',
    icon: <Settings />,
    to: '/app/settings',
  },
];

const NavigationDrawer = () => {
  const { t } = useTranslation();
  const { theme } = useNotesTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const drawerOpen = useAppSelector(selectNavigationDrawerOpened);

  const [dialogOpen, setDialogOpen] = useState(false);

  const matchesDesktop = useMatchesDesktop();

  const { logout } = useAuth0();

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

  const handleLogoutClicked = () => {
    logout({ returnTo: window.location.origin });
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
        {/*{matchesDesktop && (*/}
        {/*  <>*/}
        {/*    <Button*/}
        {/*      variant="contained"*/}
        {/*      size="large"*/}
        {/*      style={{*/}
        {/*        margin: 16,*/}
        {/*      }}*/}
        {/*      onClick={handleAddNoteClicked}*/}
        {/*    >*/}
        {/*      {t('nav.addnote')}*/}
        {/*    </Button>*/}
        {/*  </>*/}
        {/*)}*/}

        <List sx={{ width: drawerWidth }}>
          {routes.map((route) => (
            <div key={`nav-item-${route.name}`}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleNavItemClicked(route)}
                  selected={location.pathname === route.to}
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText>{t(route.name)}</ListItemText>
                </ListItemButton>
              </ListItem>

              {route.divider && <Divider />}
            </div>
          ))}
        </List>

        <div style={{ display: 'flex', flex: 1 }} />

        <List>
          <Divider />
          <ListItem
            button
            onClick={handleLogoutClicked}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>
              {t('nav.logout')}
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>

      {/* Add note button */}
      <Zoom
        in={location.pathname === '/app/notes'}
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
          variant={matchesDesktop ? 'extended' : 'circular'}
          onClick={handleAddNoteClicked}
        >
          <EditIcon sx={{ mr: matchesDesktop ? 1 : 0 }}/>
          {matchesDesktop && t('nav.addnote')}
        </Fab>
      </Zoom>

      <NoteFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default NavigationDrawer;
