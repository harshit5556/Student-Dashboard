import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userStr = localStorage.getItem('user');
  
  return {
    token: token || null,
    role: role || null,
    user: userStr ? JSON.parse(userStr) : null,
    isAuthenticated: !!token,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    loginSuccess: (state, action) => {
      const { token, role, ...userData } = action.payload;
      state.token = token;
      state.role = role;
      state.user = userData;
      state.isAuthenticated = true;
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

