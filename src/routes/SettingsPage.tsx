import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem, Select, SelectChangeEvent,
  Switch,
  Typography
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import PageContainer from '../components/PageContainer/PageContainer';
import { DarkMode } from '@mui/icons-material';
import useNotesTheme from '../context/themeHooks';
import LanguageIcon from '@mui/icons-material/Language';

const SettingsPage = () => {
  const { i18n, t } = useTranslation();
  const { mode, toggleDark } = useNotesTheme();

  // Language option

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <PageContainer>
      <Typography variant="h4" color="primary">{t('nav.settings')}</Typography>
      <br />
      <Card>
        <CardContent>

          <List>

            {/* Dark mode */}
            <ListItem>
              <ListItemIcon>
                <DarkMode />
              </ListItemIcon>
              <ListItemText>
                {t('settings.darkmode')}
              </ListItemText>
              <Switch
                edge="end"
                checked={mode === 'dark'}
                onChange={() => toggleDark()}
              />
            </ListItem>

            {/* Language */}
            <ListItem>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText>
                {t('settings.language')}
              </ListItemText>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={i18n.language}
                label={t('settings.language')}
                onChange={handleLanguageChange}
              >
                {['en', 'pl'].map((lang) => (
                  <MenuItem
                    key={`language-option-${lang}`}
                    value={lang}
                  >
                    {lang.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </ListItem>

          </List>

        </CardContent>
      </Card>
    </PageContainer>
  );
}

export default SettingsPage
