import api from './api'

const getProfile = async () => {
  const res = await api.get('/api/students/me')
  return res.data
}

const updateProfile = async (data) => {
  const res = await api.put('/api/students/me', data)
  return res.data
}

export default {
  getProfile,
  updateProfile
}
