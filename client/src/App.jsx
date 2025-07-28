import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './Home';
import ForgotPage from './loginPages/ForgotPage';
import Internships from './pages/Internships';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import Reports from './pages/Reports';



// Create simple page components for your routes
const Dashboard = () => <div><h1>Dashboard Page</h1><p>Welcome to the dashboard!</p></div>;
const VirtualReality = () => <div><h1>Virtual Reality</h1><p>VR content here</p></div>;



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes outside dashboard layout */}
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        
        {/* Dashboard layout with nested routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="Internships" element={<Internships />} />
          <Route path="Applications" element={<Applications />} />
          <Route path="virtual-reality" element={<VirtualReality />} />
          <Route path="Report" element={<Reports />} />
          <Route path="Profile" element={<Profile />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
