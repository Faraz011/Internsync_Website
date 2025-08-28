import React, { useState } from 'react';
import { Eye, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApplicationsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Sample applications data
  const applications = [
    { 
      id: 'APP001', 
      applicantName: 'John Doe',
      position: 'Frontend Developer',
      company: 'Linear, Jakarta',
      status: 'pending',
      appliedDate: '2025-08-25',
      experience: '2 years'
    },
    { 
      id: 'APP002', 
      applicantName: 'Sarah Smith',
      position: 'QA Tester',
      company: 'Google',
      status: 'accepted',
      appliedDate: '2025-08-24',
      experience: '3 years'
    },
    { 
      id: 'APP003', 
      applicantName: 'Mike Johnson',
      position: 'UI Designer',
      company: 'Notion',
      status: 'rejected',
      appliedDate: '2025-08-23',
      experience: '1 year'
    },
    { 
      id: 'APP004', 
      applicantName: 'Emily Chen',
      position: 'Backend Developer',
      company: 'Stripe',
      status: 'pending',
      appliedDate: '2025-08-22',
      experience: '4 years'
    },
    { 
      id: 'APP005', 
      applicantName: 'David Wilson',
      position: 'Data Analyst',
      company: 'Airbnb',
      status: 'accepted',
      appliedDate: '2025-08-21',
      experience: '2 years'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleRowClick = (applicationId) => {
    // Navigate to detailed application page
    navigate(`/applications/${applicationId}`);
  };

  const Pagination = ({ currentPage, setCurrentPage, totalPages = 5 }) => (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </button>
      {[1, 2, 3, 4, 5].map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 rounded-lg transition-colors ${
            currentPage === page 
              ? 'bg-black text-white' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {page}
        </button>
      ))}
      <span className="px-2 text-gray-500">...</span>
      <button className="w-10 h-10 rounded-lg hover:bg-gray-100 text-gray-700">40</button>
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Application Reviews</h1>
          <p className="text-gray-600 mt-2">Manage and review internship applications</p>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Application ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Applicant</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Applied Date</th>
                  
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr 
                    key={application.id} 
                    onClick={() => handleRowClick(application.id)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                        {application.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{application.applicantName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{application.position}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{application.company}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{application.appliedDate}</div>
                    </td>
                   
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click when clicking action buttons
                            console.log('View application:', application.id);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View Application"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click when clicking action buttons
                            console.log('Edit application:', application.id);
                          }}
                          className="text-gray-600 hover:text-gray-800 transition-colors"
                          title="Edit Application"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTable;
