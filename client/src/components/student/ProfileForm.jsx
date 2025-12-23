import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile, updateProfile } from '../../redux/studentSlice'

const ProfileForm = () => {
  const dispatch = useDispatch()
  const { profile, loading, error, updateSuccess } = useSelector(
    state => state.student
  )

  const [form, setForm] = useState({
    name: '',
    email: '',
    course: '',
    subjects: []
  })

  const [localError, setLocalError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  
  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      
      let subjectsArray = []
      if (Array.isArray(profile.subjects)) {
        subjectsArray = profile.subjects
          .map(s => String(s).trim())
          .filter(s => s && s.length > 0)
      } else if (profile.subjects) {
        subjectsArray = [String(profile.subjects).trim()].filter(s => s && s.length > 0)
      }

      console.log('Loading profile into form:', {
        profileSubjects: profile.subjects,
        processedSubjects: subjectsArray
      })

      setForm(prev => {
        
        return {
          name: profile.name || '',
          email: profile.email || '',
          course: profile.course || '',
          subjects: subjectsArray
        }
      })
    }
  }, [profile])

  
  useEffect(() => {
    if (updateSuccess) {
      setSuccessMsg('Profile updated successfully!')
      setTimeout(() => setSuccessMsg(''), 2000)
      
      setTimeout(() => {
        console.log('Refreshing profile after successful update...')
        dispatch(fetchProfile())
      }, 500)
    }
  }, [updateSuccess, dispatch])

  
  useEffect(() => {
    if (error) {
      setLocalError(error)
      setTimeout(() => setLocalError(''), 3000)
    }
  }, [error])

  
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  
  const submit = e => {
    e.preventDefault()
    setLocalError('')

    if (!form.name.trim() || !form.email.trim()) {
      setLocalError('Name and Email are required.')
      return
    }

  
    const cleanSubjects = (form.subjects || [])
      .map(s => String(s).trim())
      .filter(s => s && s.length > 0)

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subjects: cleanSubjects
    }

    if (form.course.trim()) {
      payload.course = form.course.trim()
    }

    console.log('Submitting profile update with payload:', payload)
    dispatch(updateProfile(payload))
  }

  if (loading && !profile) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full" />
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {localError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-medium">{localError}</p>
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-green-700 font-medium">{successMsg}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Course 
        </label>
        <input
          name="course"
          value={form.course}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  )
}

export default ProfileForm
