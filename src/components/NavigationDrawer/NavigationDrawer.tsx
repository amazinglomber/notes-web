import { Archive, Delete, Notes, Settings } from '@mui/icons-material';
import { Button, Drawer, List, ListItem, ListItemIcon, ListItemText, styled, Switch } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { addNote } from '../../store/reducers/notesReducer';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../store/hooks';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ThemeContext from '../../context/ThemeContext';
import useTheme from '../../context/themeHooks';
import LabelIcon from '@mui/icons-material/Label';
import i18n from '../../i18n';

const drawerWidth = 240;

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
  {
    name: 'nav.labels',
    icon: <LabelIcon />,
    to: '/labels',
  },
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
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { mode, toggleDark } = useTheme();

  // temporary
  const [lang, setLang] = useState('en');

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
            variant="outlined"
            onClick={async () => {
              const note = await fetchPost();
              dispatch(addNote(note));
            }}
          >
            Add note
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
    </div>
  );
};

export default NavigationDrawer;
