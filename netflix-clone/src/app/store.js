import { configureStore } from '@reduxjs/toolkit';

var counterReducer;

export const store = configureStore({
  reducer: {
   counter: counterReducer,
  },
});
