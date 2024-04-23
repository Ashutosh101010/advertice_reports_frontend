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

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/organisation" element={<SuperAdminOrgnisationList />} />
            <Route path="/reports/basic" element={<BasicComponent />} />
          </Route>
          <Route path="login" element={<LoginForm />} />
        </Routes>
      </Router>

    </AuthProvider>
  )
}

export default App
