import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './loginPages/loginPage';
import ForgotPage from './loginPages/ForgotPage';
import VerificationPage from './loginPages/verification';

import Applications from './pages/Applications';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import InternshipsDashboard from './pages/InternShips/IntershipDashboard';
import './App.css'
import InternshipForm from './pages/InternShips/AddInternShip';
import Dashboard from './pages/Dashboard';
import ExtraCullicularForm from './pages/ExtraCullicular/AddExtracullicular';
import VolunteerForm from './pages/Volunteer/AddVounteer';








function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes outside dashboard layout */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        
        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="Internships">
            <Route index element={<InternshipsDashboard />} />
            <Route path="add-internship" element={<InternshipForm />} />
            <Route path="add-extracullicular" element={<ExtraCullicularForm />} />
            <Route path="add-volunteer" element={<VolunteerForm />} />
          </Route>
          
          <Route path="Applications" element={<Applications />} />
          
          <Route path="Profile" element={<Profile />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
