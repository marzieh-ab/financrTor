import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import Topbar from './Tobar';
import { Stack } from '@mui/material';

export default function DashboardLayout() {
  return (
    <div>

      <Topbar/>
      <Stack     direction={{ xs: 'column',sm:"column",md:"row",lg:"row" }} sx={{width:"100%" ,display: { sm: "block",md:"flex",lg:"flex"}  }} >
      <Sidebar />
      <Outlet />

      </Stack>
      
    </div>
  )
}
