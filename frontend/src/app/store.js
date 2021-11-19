import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import rootReducer from './reducers/index';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    root: rootReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
