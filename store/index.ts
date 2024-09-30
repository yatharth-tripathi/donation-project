import { configureStore } from '@reduxjs/toolkit';
import charityReducer from './charitySlice';

export const store = configureStore({
  reducer: {
    charity: charityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
