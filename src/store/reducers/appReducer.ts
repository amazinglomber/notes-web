import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface IAppState {
  navigationDrawerOpened: boolean;
  navBarTitle: string;
}

const initialState: IAppState = {
  navigationDrawerOpened: false,
  navBarTitle: 'nav.notes'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.navigationDrawerOpened = action.payload;
    },
    setNavBarTitle(state, action: PayloadAction<string>) {
      state.navBarTitle = action.payload;
    }
  }
});

export default appSlice.reducer;
