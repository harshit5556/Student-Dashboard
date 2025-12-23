import Navbar from '../../components/common/Navbar'
import StudentTable from '../../components/admin/StudentTable'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth || {})

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Manage all students and their information</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <StudentTable />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
