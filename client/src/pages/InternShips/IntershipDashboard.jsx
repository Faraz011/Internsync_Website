import React, { useState } from 'react';
import { Plus, Filter, Eye, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const IntershipDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPage, setApplicationsPage] = useState(1);

  const internships = [
    { id: 1, title: 'Web Dev Intern', company: 'Linear, Jakarta', status: 'Open', duration: 'May-July 2025', apps: 125 },
    { id: 2, title: 'QA Tester', company: 'Google', status: 'Closed', duration: 'Feb-Apr 2025', apps: 80 },
    { id: 3, title: 'UI Designer', company: 'Notion', status: 'Open', duration: 'June-Aug 2025', apps: 95 }
  ];

  const applications = [
    { id: 1, name: 'John Doe', title: 'Web Dev Intern', date: 'May 5, 2025', status: 'Accepted' },
    { id: 2, name: 'Anika Roy', title: 'Data Analyst', date: 'May 6, 2025', status: 'Pending' },
    { id: 3, name: 'Honey Singh', title: 'Writer', date: 'May 8, 2025', status: 'Rejected' }
  ];

  const recentApplicants = [
    { name: 'John Doe', status: 'Accepted' },
    { name: 'Aisha Khan', status: 'Pending' },
    { name: 'Rahul Verma', status: 'Rejected' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-green-500 text-white';
      case 'closed': return 'bg-red-500 text-white';
      case 'accepted': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'rejected': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const StatCard = ({ title, value, bgColor, textColor = 'text-white' }) => (
    <div className={`${bgColor} ${textColor} p-4 rounded-lg`}>
      <div className="text-sm opacity-90">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );

  const SidebarCard = ({ title, applicationsReceived, postedOn, applicants, bgColor = 'bg-gray-800' }) => (
    <div className={`${bgColor} text-white p-4 rounded-lg mb-4`}>
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="space-y-2 text-sm">
        <div>Applications Received: <span className="float-right">{applicationsReceived}</span></div>
        <div>Posted On: <span className="float-right">{postedOn}</span></div>
        <div className="border-t border-gray-600 pt-2 mt-3">
          <div className="font-medium mb-2">Recent Applicants:</div>
          {applicants.map((applicant, idx) => (
            <div key={idx} className="flex justify-between items-center mb-1">
              <span>{applicant.name}</span>
              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(applicant.status)}`}>
                {applicant.status}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded mt-3 hover:bg-blue-700 transition-colors">
          VIEW ALL APPLICANTS
        </button>
      </div>
    </div>
  );

  const Pagination = ({ currentPage, setCurrentPage, totalPages = 5 }) => (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button 
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        className="p-1 hover:bg-gray-100 rounded"
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </button>
      {[1, 2, 3, 4, 5].map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-8 h-8 rounded ${currentPage === page ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
        >
          {page}
        </button>
      ))}
      <span className="px-2">...</span>
      <button className="w-8 h-8 rounded hover:bg-gray-100">40</button>
      <button 
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        className="p-1 hover:bg-gray-100 rounded"
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <section className="main-content">

      <div>
          <h1 className="text-xl font-semibold">Welcome, [Admin Name]</h1>
          <p className="text-gray-600 text-sm">Manage all your internships and applicants from this centralized dashboard.</p>
        </div>

      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Stats Cards */}
          <div className="grid  lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Internships" value="101" bgColor="bg-blue-500" />
            <StatCard title="Open Internships" value="12" bgColor="bg-green-500" />
            <StatCard title="Closed Internships" value="58" bgColor="bg-red-500" />
            <StatCard title="Process Internships" value="31" bgColor="bg-yellow-500" />
          </div>

          {/* Internship Management Table */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h2 className="text-lg font-semibold mb-2 sm:mb-0">Internship Management Table</h2>
              <div className="flex space-x-2">
                <Link to="/add-internship" className="bg-black text-white px-4 py-2 rounded flex items-center">
                  <Plus size={16} className="mr-2" />
                  ADD INTERNSHIP
                </Link>
                <button className="border border-gray-300 px-4 py-2 rounded flex items-center">
                  <Filter size={16} />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Company</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Duration</th>
                    <th className="px-4 py-3 text-left">Apps Received</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {internships.map((internship) => (
                    <tr key={internship.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{internship.title}</td>
                      <td className="px-4 py-3">{internship.company}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(internship.status)}`}>
                          {internship.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{internship.duration}</td>
                      <td className="px-4 py-3">{internship.apps}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4">
              <div className="text-sm text-gray-600 mb-2">Showing data 1 to 8 of 204K entries</div>
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Applications Snapshot</h2>
              <button className="border border-gray-300 px-4 py-2 rounded flex items-center">
                <Filter size={16} />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Applicant Name</th>
                    <th className="px-4 py-3 text-left">Internship Title</th>
                    <th className="px-4 py-3 text-left">Applied Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{app.name}</td>
                      <td className="px-4 py-3">{app.title}</td>
                      <td className="px-4 py-3">{app.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4">
              <div className="text-sm text-gray-600 mb-2">Showing data 1 to 8 of 204K entries</div>
              <Pagination currentPage={applicationsPage} setCurrentPage={setApplicationsPage} />
            </div>
          </div>
        </div>

   
      </div>
      </section>

      {/* sidebar */}

           {/* Sidebar */}
           <section>
           <div className="bg-black text-white px-3 py-1 rounded text-sm">
          Web Dev Intern (Linear, Jakarta)
        </div>
    
           <div className="w-full lg:w-80 p-4 lg:p-6 bg-gray-100">
          <SidebarCard 
            title="Web Dev Intern (Linear, Jakarta)"
            applicationsReceived={125}
            postedOn="Apr 1, 2025"
            applicants={recentApplicants}
          />
          
          <SidebarCard 
            title="UI Designer Intern (Notion)"
            applicationsReceived={95}
            postedOn="Apr 3, 2025"
            applicants={[
              { name: 'Clara Lin', status: 'Accepted' },
              { name: 'David Kim', status: 'Pending' },
              { name: 'Aman Singh', status: 'Rejected' }
            ]}
          />
          
          <SidebarCard 
            title="Data Analyst Intern (Stripe)"
            applicationsReceived={110}
            postedOn="Apr 5, 2025"
            applicants={[
              { name: 'Sarah Chen', status: 'Accepted' },
              { name: 'Mike Wilson', status: 'Pending' },
              { name: 'Lisa Park', status: 'Rejected' }
            ]}
          />
        </div>
                
        </section>
    </div>
  );
};

export default IntershipDashboard;