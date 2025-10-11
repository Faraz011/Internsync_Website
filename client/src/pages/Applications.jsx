import React, { useState, useEffect } from 'react';
import { Eye, ChevronLeft, ChevronRight, Loader2, FileText, X, Check, Clock, Plus as PlusIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import applicationAPI from '../services/applicationAPI';

const Applications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await applicationAPI.getUserApplications();
        setApplications(response.data || []);
        setTotalPages(Math.ceil((response.data?.length || 0) / itemsPerPage));
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError(err.response?.data?.message || 'Failed to load applications. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    const baseStyles = 'px-3 py-1 text-xs font-medium rounded-full flex items-center';
    
    switch (status) {
      case 'PENDING':
        return (
          <span className={`${baseStyles} bg-yellow-100 text-yellow-800`}>
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case 'ACCEPTED':
        return (
          <span className={`${baseStyles} bg-green-100 text-green-800`}>
            <Check className="w-3 h-3 mr-1" /> Accepted
          </span>
        );
      case 'REJECTED':
        return (
          <span className={`${baseStyles} bg-red-100 text-red-800`}>
            <X className="w-3 h-3 mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className={`${baseStyles} bg-gray-100 text-gray-800`}>
            {status}
          </span>
        );
    }
  };

  const handleRowClick = (applicationId) => {
    navigate(`/dashboard/applications/${applicationId}`);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const filteredApplications = applications.filter(app => 
    statusFilter === 'ALL' || app.status === statusFilter
  );

  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const Pagination = () => (
    <div className="flex items-center justify-between mt-6 px-4 py-3 border-t border-gray-200">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
        <span className="font-medium">
          {Math.min(currentPage * itemsPerPage, filteredApplications.length)}
        </span>{' '}
        of <span className="font-medium">{filteredApplications.length}</span> results
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md text-sm font-medium disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 border rounded-md text-sm font-medium disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2">Loading applications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <X className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage your internship applications</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/dashboard/Internships"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply for New Internship
          </Link>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => handleStatusFilter('ALL')}
          className={`px-4 py-2 text-sm font-medium rounded-full ${
            statusFilter === 'ALL'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Applications
        </button>
        <button
          onClick={() => handleStatusFilter('PENDING')}
          className={`px-4 py-2 text-sm font-medium rounded-full flex items-center ${
            statusFilter === 'PENDING'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Clock className="w-4 h-4 mr-1" /> Pending
        </button>
        <button
          onClick={() => handleStatusFilter('ACCEPTED')}
          className={`px-4 py-2 text-sm font-medium rounded-full flex items-center ${
            statusFilter === 'ACCEPTED'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Check className="w-4 h-4 mr-1" /> Accepted
        </button>
        <button
          onClick={() => handleStatusFilter('REJECTED')}
          className={`px-4 py-2 text-sm font-medium rounded-full flex items-center ${
            statusFilter === 'REJECTED'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <X className="w-4 h-4 mr-1" /> Rejected
        </button>
      </div>

      {/* Applications Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
            <p className="mt-1 text-sm text-gray-500">
              {statusFilter === 'ALL'
                ? "You haven't applied to any internships yet."
                : `You don't have any ${statusFilter.toLowerCase()} applications.`}
            </p>
            <div className="mt-6">
              <Link
                to="/dashboard/Internships"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Browse Internships
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedApplications.map((application) => (
                  <tr 
                    key={application._id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(application._id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {application.jobId?.title || 'Position not available'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.applicantName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {application.jobId?.company || 'Company not specified'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(application.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(application._id);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination />
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
