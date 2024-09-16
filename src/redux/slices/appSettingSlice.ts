import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appLang: 'en',
};

const appSettingSlice = createSlice({
  name: 'appSetting',
  initialState: initialState,
  reducers: {
    setAppLang: (state, action) => {
      state.appLang = action.payload;
    },
  },
});

export const {setAppLang} = appSettingSlice.actions;

export default appSettingSlice.reducer;
