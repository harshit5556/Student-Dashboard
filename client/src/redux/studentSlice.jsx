import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import studentService from '../services/studentService'

export const fetchProfile = createAsyncThunk(
  'student/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await studentService.getProfile()
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch profile')
    }
  }
)

export const updateProfile = createAsyncThunk(
  'student/updateProfile',
  async (data, { rejectWithValue }) => {
    try {
      return await studentService.updateProfile(data)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to update profile')
    }
  }
)

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    updateSuccess: false
  },
  reducers: {
    clearError(state) {
      state.error = null
    },
    clearUpdateSuccess(state) {
      state.updateSuccess = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
        state.error = null
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch profile'
      })
      .addCase(updateProfile.pending, state => {
        state.loading = true
        state.error = null
        state.updateSuccess = false
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
        state.error = null
        state.updateSuccess = true
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update profile'
        state.updateSuccess = false
      })
  }
})

export const { clearError, clearUpdateSuccess } = studentSlice.actions

export default studentSlice.reducer
