import React from 'react'

const AdminSideBar = ({ handleLogout }) => {
    
  return (
    <div className='admin-sidebar w-64 bg-white shadow-md p-4'>
        <h2 className='text-xl font-bold mb-4'>Admin Dashboard</h2>
        <ul className='space-y-2'>
            <li>
                <a href="/admin/users" className='text-gray-700 hover:text-teal-500'>Manage Users</a>
            </li>
            <li>
                <a href="/admin/posts" className='text-gray-700 hover:text-teal-500'>Manage Posts</a>
            </li>
            <li>
                <a href="/admin/settings" className='text-gray-700 hover:text-teal-500'>Settings</a>
            </li>
            <li>
                <a href="/admin/reports" className='text-gray-700 hover:text-teal-500'>View Reports</a>
            </li>
            <li>
                <a href="/admin/logs" className='text-gray-700 hover:text-teal-500'>Activity Logs</a>
            </li>
            <li>
                <a href="/admin/help" className='text-gray-700 hover:text-teal-500'>Help & Support</a>
            </li>
        </ul>
        <div className='mt-6'>
            <button 
                className='w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition-colors'
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
        <div className='mt-4 text-sm text-gray-500'>
            <p>&copy; 2025 CHS Outreach Board</p>
            <p>Developer by <a href="#">Inkuit</a></p>
        </div>
    </div>
  )
}

export default AdminSideBar
