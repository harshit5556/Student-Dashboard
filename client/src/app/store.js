import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import studentReducer from '../redux/studentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
  },
});

export default store;
