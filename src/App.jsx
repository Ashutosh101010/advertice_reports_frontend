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
import { AuthProvider } from './components/pages/authContext/AuthContext';
import Layout from './components/pages/layout/Layout';
import Campaigns from './components/pages/campaigns/Campaigns';
import BasicComponent from './components/pages/reports/Basic';
import SuperAdminOrgnisationList from './components/pages/superAdminOrganisation/SuperAdminOrganisation';
import AdminOrgnisationList from './components/pages/adminOrganisation/adminOrganisation';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/super-admin-organisation" element={<SuperAdminOrgnisationList />} />
            <Route path="/admin-organisation" element={<AdminOrgnisationList />} />
            <Route path="/reports/basic" element={<BasicComponent />} />
          </Route>
          <Route path="login" element={<LoginForm />} />
        </Routes>
      </Router>

    </AuthProvider>
  )
}

export default App
