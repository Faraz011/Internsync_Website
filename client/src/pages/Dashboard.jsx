import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import internshipAPI from '../services/internshipAPI';
import applicationAPI from '../services/applicationAPI';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalInternships: 0,
    totalApplications: 0,
    activeInternships: 0,
    closedInternships: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
  });
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [chartData, setChartData] = useState([
    { name: "Open", value: 0 },
    { name: "Closed", value: 0 },
  ]);
  const [appStatusData, setAppStatusData] = useState([
    { name: 'Pending', value: 0 },
    { name: 'Accepted', value: 0 },
    { name: 'Rejected', value: 0 },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch internships and applications in parallel
        const [internshipsData, applicationsData] = await Promise.all([
          internshipAPI.getInternships(),
          applicationAPI.getUserApplications()
        ]);
        
        setInternships(internshipsData);
        setApplications(applicationsData.data || []);
        
        // Calculate internship stats
        const totalInternships = internshipsData.length;
        const activeInternships = internshipsData.filter(int => int.status === 'Open').length;
        const closedInternships = totalInternships - activeInternships;
        
        // Calculate application stats
        const pendingApps = applicationsData.data.filter(app => app.status === 'PENDING').length;
        const acceptedApps = applicationsData.data.filter(app => app.status === 'ACCEPTED').length;
        const rejectedApps = applicationsData.data.filter(app => app.status === 'REJECTED').length;
        
        setStats({
          totalInternships,
          activeInternships,
          closedInternships,
          totalApplications: applicationsData.data.length,
          pendingApplications: pendingApps,
          acceptedApplications: acceptedApps,
          rejectedApplications: rejectedApps,
        });
        
        // Update charts data
        setChartData([
          { name: "Open", value: activeInternships },
          { name: "Closed", value: closedInternships },
        ]);
        
        setAppStatusData([
          { name: 'Pending', value: pendingApps },
          { name: 'Accepted', value: acceptedApps },
          { name: 'Rejected', value: rejectedApps },
        ]);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2">Loading dashboard data...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
        <StatCard 
          title="Internships" 
          value={stats.totalInternships} 
          bgColor="bg-blue-500" 
          loading={isLoading}
          description="Total opportunities"
        />
        <StatCard 
          title="Active" 
          value={stats.activeInternships} 
          bgColor="bg-green-500" 
          loading={isLoading}
          description="Open positions"
        />
        <StatCard 
          title="Applications" 
          value={stats.totalApplications} 
          bgColor="bg-purple-500" 
          loading={isLoading}
          description="Total submitted"
        />
        <StatCard 
          title="Pending" 
          value={stats.pendingApplications} 
          bgColor="bg-amber-500" 
          loading={isLoading}
          description="Under review"
        />
        <StatCard 
          title="Accepted" 
          value={stats.acceptedApplications} 
          bgColor="bg-emerald-500" 
          loading={isLoading}
          description="Approved applications"
        />
        <StatCard 
          title="Rejected" 
          value={stats.rejectedApplications} 
          bgColor="bg-red-500" 
          loading={isLoading}
          description="Not selected"
        />
        <StatCard 
          title="Success Rate" 
          value={stats.totalApplications > 0 ? `${Math.round((stats.acceptedApplications / stats.totalApplications) * 100)}%` : '0%'} 
          bgColor="bg-indigo-500" 
          loading={isLoading}
          description="Acceptance ratio"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Internships */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Internships</h2>
            <Link to="/dashboard/Internships" className="text-sm text-blue-500 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {internships.slice(0, 3).map((internship) => (
              <div key={internship.id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{internship.title}</h3>
                    <p className="text-sm text-gray-600">{internship.company}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${internship.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {internship.status}
                  </span>
                </div>
              </div>
            ))}
            {internships.length === 0 && !isLoading && (
              <p className="text-gray-500 text-sm">No internships found</p>
            )}
          </div>
        </div>

        {/* Internships Overview */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Internships Overview</h2>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} internships`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications Status */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Applications Status</h2>
            <Link to="/dashboard/Applications" className="text-sm text-blue-500 hover:underline">
              View all
            </Link>
          </div>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appStatusData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, bgColor, textColor = 'text-white', loading = false, description = '' }) => (
  <div className={`${bgColor} ${textColor} p-4 rounded-lg`}>
    <div className="text-sm opacity-90">{title}</div>
    <div className="text-2xl font-bold mb-1">
      {loading ? <div className="h-8 w-16 bg-white/20 rounded animate-pulse"></div> : value}
    </div>
    {description && <div className="text-xs opacity-80">{description}</div>}
  </div>
);

const COLORS = ["#4CAF50", "#F44336"];

export default Dashboard;