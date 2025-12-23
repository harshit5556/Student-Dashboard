import Navbar from '../../components/common/Navbar'
import ProfileForm from '../../components/student/ProfileForm'
import { useSelector } from 'react-redux'

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth || {})

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
                <p className="text-gray-600">Manage your profile information here</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">My Profile</h3>
            </div>
            <div className="p-6">
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
