import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import appSettingSlice from './slices/appSettingSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  appSetting: appSettingSlice,
});

export default rootReducer;
