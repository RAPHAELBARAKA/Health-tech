import React from 'react'
import AdminDashboard from '../../components/Admin/AdminDashboard'
import { Box } from '@mui/material'
import AdminSidebar from '../../components/Admin/AdminSidebar'

function AdminDashboardPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }} >
         <AdminSidebar/>
        <AdminDashboard/>
       
    </Box>
  )
}

export default AdminDashboardPage