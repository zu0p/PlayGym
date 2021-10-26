import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import rootReducer from './reducers/index';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    root: rootReducer
  },
});
