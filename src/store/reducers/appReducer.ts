import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface IAppState {
  navigationDrawerOpened: boolean;
}

const initialState: IAppState = {
  navigationDrawerOpened: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.navigationDrawerOpened = action.payload;
    },
  }
});

export default appSlice.reducer;
