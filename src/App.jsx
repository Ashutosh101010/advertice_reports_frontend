import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/login/LoginForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Dashboard from './components/pages/dashboard/Dashboard';
import Layout from './components/pages/layout/Layout';
import Campaigns from './components/pages/campaigns/Campaigns';
import BasicComponent from './components/pages/reports/Basic';
import SuperAdminOrgnisationList from './components/pages/superAdminOrganisation/SuperAdminOrganisation';
import AdminOrgnisationList from './components/pages/adminOrganisation/adminOrganisation';
import SuperAdminLoginForm from './components/login/SuperAdminLogin';
import AdvanceComponent from './components/pages/reports/Advance';
import { SnackbarProvider } from 'notistack';

function App() {

  // SuperAdmin ID Passwor
  // id: superadmin, password- advertice123

  // Admin ID Password
  // id: mayur, password- mayur@123

  return (
    <Router>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/super-admin-organisation" element={<SuperAdminOrgnisationList />} />
            <Route path="/admin-organisation" element={<AdminOrgnisationList />} />
            <Route path="/reports/basic" element={<BasicComponent />} />
            <Route path="/reports/advance" element={<AdvanceComponent />} />
          </Route>
          <Route path="/advertiser-login" element={<LoginForm />} />
          <Route path="/super-admin-login" element={<SuperAdminLoginForm />} />
        </Routes>
      </SnackbarProvider>
    </Router>
  )
}

export default App
