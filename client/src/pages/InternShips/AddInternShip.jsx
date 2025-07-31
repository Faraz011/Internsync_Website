import { useState } from 'react';
import { Calendar, Upload, FileText } from 'lucide-react';

export default function InternshipForm() {
  const [formData, setFormData] = useState({
    internshipTitle: 'Backend Developer Intern',
    companyName: 'Google',
    industry: 'Software',
    internshipType: 'Full Time',
    startDate: '',
    endDate: '',
    applicationDeadline: '',
    expectedWeeklyHours: '',
    compensationType: ['Paid'],
    stipendOffered: '',
    requiredSkills: 'Java',
    eligibility: 'Pursuing B Tech in CS',
    description: '',
    companyWebsite: '',
    status: 'Open',
    displayInMobileApp: false,
    featureOnHomePage: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const internshipTypes = ['Full Time', 'Part Time', 'Contract', 'Intern', 'Remote', 'Hybrid'];
  const industries = ['Software', 'Finance', 'Healthcare', 'Education', 'Marketing'];
  const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta'];
  const skills = ['Java', 'Python', 'JavaScript', 'React', 'Node.js'];
  const educationOptions = ['Pursuing B Tech in CS', 'Pursuing MBA', 'Graduate Degree'];

  return (
    <div className="max-w-6xl rounded border-slate-300  mx-auto p-6 border bg-white">
      <h1 className="text-2xl font-semibold mb-6">Add New Internship</h1>
      
      {/* Basic Information */}
      <div className="mb-8 border rounded p-3 ">

        <section className="flex justify-between">


        <h2 className="text-lg font-medium mb-4">Basic Information</h2>
        
        {/* Internship Type Checkboxes */}
        <div className="flex flex-wrap gap-4 mb-6">
          {internshipTypes.map(type => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
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
              <option>Backend Developer Intern</option>
              <option>Frontend Developer Intern</option>
              <option>Full Stack Developer Intern</option>
            </select>
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
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
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
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
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
                type="text"
                placeholder="DD/MM/YY"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="DD/MM/YY"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Application Deadline <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="DD/MM/YY"
                value={formData.applicationDeadline}
                onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-2">Expected Weekly Hours</label>
          <input
            type="text"
            placeholder="Type here"
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
              placeholder="Type here"
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
              {educationOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
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
            placeholder="Type here"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Browse files
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Company Website / Portfolio Link</label>
            <input
              type="url"
              value={formData.companyWebsite}
              onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
          CANCEL
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          SAVE AS DRAFT
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          PUBLISH INTERNSHIP
        </button>
      </div>
    </div>
  );
}