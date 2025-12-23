import { useEffect, useState } from 'react'
import api from '../../services/api'

const StudentTable = () => {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    course: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    course: '',
    subjects: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await api.get('/api/students')
      console.log('=== FETCHING STUDENTS FOR ADMIN DASHBOARD ===')
      console.log('Raw API response:', res.data)
      
      const studentsWithSubjects = res.data.map(student => {
        
        let subjectsArray = [];
        if (Array.isArray(student.subjects)) {
          
          subjectsArray = student.subjects
            .map(s => String(s)) 
            .filter(s => s && s.trim() && s.trim() !== 'Not Set' && s.trim() !== 'undefined' && s.trim() !== 'null')
            .map(s => s.trim());
        } else if (student.subjects && String(student.subjects).trim() !== 'Not Set') {
          
          const subjectStr = String(student.subjects).trim();
          if (subjectStr && subjectStr !== 'Not Set') {
            subjectsArray = [subjectStr];
          }
        }
        console.log(`Student ${student.email}:`, {
          name: student.name,
          subjectsRaw: student.subjects,
          subjectsRawType: typeof student.subjects,
          subjectsRawIsArray: Array.isArray(student.subjects),
          subjectsProcessed: subjectsArray,
          subjectsProcessedLength: subjectsArray.length,
          course: student.course
        })
        return {
          ...student,
          subjects: subjectsArray
        }
      })
      console.log('Processed students with subjects:', studentsWithSubjects)
      setStudents(studentsWithSubjects)
    } catch (err) {
      setError('Failed to load students.')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
    
  }, [])

  
  useEffect(() => {
    const handleFocus = () => {
      console.log('Page regained focus - refreshing students...')
      fetchStudents()
    }
    
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Auto-refreshing students data...')
      fetchStudents()
    }, 10000) 

    return () => clearInterval(interval)
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/api/students', form)
      setForm({ name: '', email: '', course: '' })
      fetchStudents()
    } catch (err) {
      setError('Failed to add student.')
    }
  }

  const startEdit = (student) => {
    setEditingId(student._id)
    setEditForm({
      name: student.name,
      email: student.email,
      course: student.course || '',
      subjects: student.subjects || []
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ name: '', email: '', course: '', subjects: [] })
  }

  const updateStudent = async (id) => {
    setError('')
    try {
      await api.put(`/api/students/${id}`, editForm)
      setEditingId(null)
      setEditForm({ name: '', email: '', course: '', subjects: [] })
      fetchStudents()
    } catch (err) {
      setError('Failed to update student.')
    }
  }

  const remove = async (id) => {
    setError('')
    try {
      await api.delete(`/api/students/${id}`)
      fetchStudents()
    } catch (err) {
      setError('Failed to delete student.')
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
          <p className="text-sm text-gray-500 mt-1">Auto-refreshes every 10 seconds</p>
        </div>
        <button
          onClick={() => {
            console.log('Manual refresh triggered by admin')
            fetchStudents()
          }}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          title="Refresh student list now"
        >
          <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? 'Refreshing...' : 'Refresh Now'}
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Student
        </h3>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Student Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Email Address"
            value={form.email}
            type="email"
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Course"
            value={form.course}
            onChange={e => setForm({ ...form, course: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={loading}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Subjects</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading && students.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                      <p className="text-gray-500">Loading students...</p>
                    </div>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-gray-500 text-lg font-medium">No students found</p>
                      <p className="text-gray-400 text-sm mt-1">Add a new student to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                students.map(s => (
                  <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                    {editingId === s._id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={editForm.name}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="email"
                            value={editForm.email}
                            onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <input
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Course (optional)"
                              value={editForm.course || ''}
                              onChange={e => setEditForm({ ...editForm, course: e.target.value })}
                            />
                            <div className="text-xs text-gray-500">
                              Subjects: {editForm.subjects?.join(', ') || 'None'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => updateStudent(s._id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                              disabled={loading}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                              disabled={loading}
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 font-medium text-gray-900">{s.name}</td>
                        <td className="px-6 py-4 text-gray-600">{s.email}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(s.subjects) && s.subjects.length > 0 ? (
                              s.subjects.map((subject, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                >
                                  {String(subject)}
                                </span>
                              ))
                            ) : s.course && s.course.trim() && s.course.trim() !== 'Not Set' ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                {s.course}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-sm italic">No subjects selected</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => startEdit(s)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                              disabled={loading}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete ${s.name}?`)) {
                                  remove(s._id)
                                }
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                              disabled={loading}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StudentTable
