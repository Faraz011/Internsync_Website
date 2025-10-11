import { useState } from 'react';
import { Calendar, Upload, FileText } from 'lucide-react';
import { useInternshipAPI } from "../../hooks/useInternshipAPI";

export default function InternshipForm() {
  const { createInternship, loading, error, clearError } = useInternshipAPI();
  
  const [formData, setFormData] = useState({
    internshipTitle: '',
    companyName: '',
    industry: '',
    internshipType: '',
    startDate: '',
    endDate: '',
    applicationDeadline: '',
    expectedWeeklyHours: '',
    compensationType: [],
    stipendOffered: '',
    requiredSkills: '',
    eligibility: '',
    description: '',
    companyWebsite: '',
    status: 'Open',
    displayInMobileApp: false,
    featureOnHomePage: false
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    
    // Clear API error when user starts typing
    if (error) {
      clearError();
    }
    
    // Clear submit status
    if (submitStatus) {
      setSubmitStatus('');
    }
  };

  const handleCheckboxChange = (field, value, isMultiple = false) => {
    if (isMultiple) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].includes(value) 
          ? prev[field].filter(item => item !== value)
          : [...prev[field], value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      'internshipTitle', 
      'companyName', 
      'industry', 
      'internshipType',
      'startDate', 
      'endDate', 
      'applicationDeadline', 
      'eligibility', 
      'description'
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        errors[field] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }
    });

    // Date validation
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (startDate >= endDate) {
        errors.endDate = 'End date must be after start date';
      }
    }

    // URL validation
    if (formData.companyWebsite) {
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(formData.companyWebsite)) {
        errors.companyWebsite = 'Please enter a valid URL (starting with http:// or https://)';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (action) => {
    setSubmitStatus('');
    
    // Validate form for publish action
    if (action === 'publish' && !validateForm()) {
      setSubmitStatus('Please fix the validation errors above');
      return;
    }

    try {
      const submitData = {
        ...formData,
        status: action === 'draft' ? 'Draft' : 'Open'
      };

      const response = await createInternship(submitData);
      
      if (response.success) {
        setSubmitStatus(`Successfully ${action === 'draft' ? 'saved as draft' : 'published'}!`);
        
        // Reset form after successful submission
        setTimeout(() => {
          resetForm();
        }, 2000);
      }
    } catch (error) {
      setSubmitStatus(`Error: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      internshipTitle: '',
      companyName: '',
      industry: '',
      internshipType: '',
      startDate: '',
      endDate: '',
      applicationDeadline: '',
      expectedWeeklyHours: '',
      compensationType: [],
      stipendOffered: '',
      requiredSkills: '',
      eligibility: '',
      description: '',
      companyWebsite: '',
      status: 'Open',
      displayInMobileApp: false,
      featureOnHomePage: false
    });
    setValidationErrors({});
    setSubmitStatus('');
    clearError();
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      resetForm();
    }
  };

  const internshipTypes = ['Full Time', 'Part Time', 'Contract', 'Intern', 'Remote', 'Hybrid'];
  const industries = ['Software', 'Finance', 'Healthcare', 'Education', 'Marketing'];
  const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta'];
  const skills = ['Java', 'Python', 'JavaScript', 'React', 'Node.js'];
  const educationOptions = ['Pursuing B Tech in CS', 'Pursuing MBA', 'Graduate Degree'];

  return (
    <div className="max-w-6xl rounded border-slate-300 mx-auto p-6 border bg-white">
      <h1 className="text-2xl font-semibold mb-6">Add New Internship</h1>
      
      {/* Status Messages */}
      {submitStatus && (
        <div className={`mb-4 p-3 rounded-md text-sm ${
          submitStatus.includes('Error') || submitStatus.includes('fix') 
            ? 'bg-red-100 border border-red-400 text-red-700' 
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {submitStatus}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          API Error: {error}
        </div>
      )}
      
      {/* Basic Information */}
      <div className="mb-8 border rounded p-3">
        <section className="flex justify-between">
          <h2 className="text-lg font-medium mb-4">Basic Information</h2>
          
          {/* Internship Type Radio Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            {internshipTypes.map(type => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="internshipType"
                  checked={formData.internshipType === type}
                  onChange={() => handleInputChange('internshipType', type)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </section>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Internship Title <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.internshipTitle}
              onChange={(e) => handleInputChange('internshipTitle', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Title</option>
              <option>Backend Developer Intern</option>
              <option>Frontend Developer Intern</option>
              <option>Full Stack Developer Intern</option>
            </select>
            {validationErrors.internshipTitle && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.internshipTitle}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Company</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
            {validationErrors.companyName && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.companyName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Industry / Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Industry</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            {validationErrors.industry && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.industry}</p>
            )}
          </div>
        </div>
      </div>

      {/* Duration & Timeline */}
      <div className="mb-8 border rounded p-3">
        <h2 className="text-lg font-medium mb-4">Duration & Timeline</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            {validationErrors.startDate && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.startDate}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            {validationErrors.endDate && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.endDate}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Application Deadline <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            {validationErrors.applicationDeadline && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.applicationDeadline}</p>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-2">Expected Weekly Hours</label>
          <input
            type="number"
            placeholder="e.g. 40"
            min="1"
            max="168"
            value={formData.expectedWeeklyHours}
            onChange={(e) => handleInputChange('expectedWeeklyHours', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Stipend & Compensation */}
      <div className="mb-8 border rounded p-3">
        <h2 className="text-lg font-medium mb-4">Stipend & Compensation</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Compensation Type</label>
            <div className="flex flex-wrap gap-4">
              {['Paid', 'Unpaid', 'Bonus Based'].map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.compensationType.includes(type)}
                    onChange={() => handleCheckboxChange('compensationType', type, true)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Stipend Offered</label>
            <input
              type="text"
              placeholder="e.g. ₹20,000 per month"
              value={formData.stipendOffered}
              onChange={(e) => handleInputChange('stipendOffered', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Skills & Requirements */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Skills & Requirements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Required Skills</label>
            <select
              value={formData.requiredSkills}
              onChange={(e) => handleInputChange('requiredSkills', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Skill</option>
              {skills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Eligibility / Education <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.eligibility}
              onChange={(e) => handleInputChange('eligibility', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Education</option>
              {educationOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {validationErrors.eligibility && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.eligibility}</p>
            )}
          </div>
        </div>
      </div>

      {/* Internship Description */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Internship Description</h2>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Describe the internship role, responsibilities, and requirements..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {validationErrors.description && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
          )}
        </div>
      </div>

      {/* Media & Links */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Media & Links</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Upload Company Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">Drag your file(s) to start uploading</p>
              <p className="text-xs text-gray-500 mb-4">OR</p>
              <button 
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                Browse files
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Company Website / Portfolio Link</label>
            <input
              type="url"
              placeholder="https://company.com"
              value={formData.companyWebsite}
              onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {validationErrors.companyWebsite && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.companyWebsite}</p>
            )}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Open</option>
              <option>Closed</option>
              <option>Draft</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Visibility</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.displayInMobileApp}
                  onChange={(e) => handleCheckboxChange('displayInMobileApp', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Display in Mobile App</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featureOnHomePage}
                  onChange={(e) => handleCheckboxChange('featureOnHomePage', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Feature on Home Page</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button 
          type="button"
          onClick={handleCancel}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          CANCEL
        </button>
        <button 
          type="button"
          onClick={() => handleSubmit('draft')}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'SAVING...' : 'SAVE AS DRAFT'}
        </button>
        <button 
          type="button"
          onClick={() => handleSubmit('publish')}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'PUBLISHING...' : 'PUBLISH INTERNSHIP'}
        </button>
      </div>
    </div>
  );
}
