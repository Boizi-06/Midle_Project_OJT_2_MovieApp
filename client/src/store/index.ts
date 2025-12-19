import { configureStore } from '@reduxjs/toolkit';
import { seatReducer } from './seatSlice';

export const store = configureStore({
  reducer: {
    seat: seatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
