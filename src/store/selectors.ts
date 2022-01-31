import { RootState } from './hooks';

export const selectNavigationDrawerOpened = (state: RootState) =>
  state.app.navigationDrawerOpened;

export const selectNavBarTitle = (state: RootState) =>
  state.app.navBarTitle;

export const selectAuthToken = (state: RootState) =>
  state.app.authToken;
