import { configureStore } from '@reduxjs/toolkit';
import appRecucer from './slices/appSlice';
import accountRecucer from './slices/accountSlice';

export const store = configureStore({
  reducer: {
    app: appRecucer,
    account: accountRecucer,
  },
});
