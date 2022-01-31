import { Archive, Notes, Settings } from '@mui/icons-material';
import { Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useTheme from '../../context/themeHooks';
import i18n from '../../i18n';
import NoteFormDialog from '../Dialogs/NoteFormDialog';

const drawerWidth = 280;

interface IRoute {
  name: string;
  icon: JSX.Element;
  to: string;
}

const routes: IRoute[] = [
  {
    name: 'nav.notes',
    icon: <Notes />,
    to: '/',
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
  // {
  //   name: 'nav.trash',
  //   icon: <Delete />,
  //   to: 'trash',
  // },
  {
    name: 'nav.settings',
    icon: <Settings />,
    to: '/settings',
  },
];

const NavigationDrawer = () => {
  const { t } = useTranslation();
  const { mode, toggleDark } = useTheme();

  const navigate = useNavigate();

  // temporary
  const [lang, setLang] = useState('en');
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchPost = (): Promise<INote> => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((posts) => {
        const index = Math.floor(Math.random() * 10);
        return {
          id: nanoid(),
          title: posts[index].title,
          body: posts[index].body,
          labels: ['label 1', 'label 2']
        };
      })
      .catch((e) => e);
  }

  const onAddNoteClicked = () => {
    setDialogOpen(true);
  };

  return (
    <div>
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth
          }}
        >
          {/* Add note button */}
          <Button
            variant="contained"
            style={{
              margin: 16
            }}
            onClick={onAddNoteClicked}
          >
            {t('nav.addnote')}
          </Button>

          <List sx={{ width: drawerWidth }}>

            {routes.map((route) => (
              <NavLink
                to={route.to}
                key={`nav-item-${route.name}`}
                style={{ textDecoration: "none", color: 'inherit' }}
              >
                <ListItem button>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText>{t(route.name)}</ListItemText>
                </ListItem>
              </NavLink>
            ))}

            {/* Dark mode toggle */}
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

      <NoteFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default NavigationDrawer;
