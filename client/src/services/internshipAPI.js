import api from './api';

class InternshipAPIService {
  /**
   * Get all internships with optional filtering and pagination
   * @param {Object} params - Query parameters
   * @param {string} [params.freeText] - Search on multiple fields like title, company, location
   * @param {number} [params.pageNo=1] - Page number for pagination
   * @param {number} [params.offset=10] - Number of items per page
   * @param {string} [params.status] - Filter by status
   * @param {string} [params.startDate] - Filter by start date (ISO format)
   * @param {string} [params.endDate] - Filter by end date (ISO format)
   * @param {'appsReceived_asc'|'appsReceived_desc'|'relevance_desc'|'deadline_asc'|'deadline_desc'} [params.sortBy] - Sort order
   * @param {string} [params.categories] - Comma-separated categories
   * @param {string} [params.tags] - Comma-separated tags
   * @param {'csv'|'web'} [params.sourceType] - Source type filter
   * @param {boolean} [params.isRemote] - Filter remote opportunities
   * @param {string} [params.jobType] - Job type (internship, scholarship, etc.)
   * @param {'internship'|'scholarship'|'extracurricular'|'activity'} [params.type] - Alias for jobType
   * @param {'internship'|'scholarship'|'extracurricular'|'activity'} [params.opportunityType] - Alias for jobType
   * @param {number} [params.stipendMin] - Minimum stipend amount
   * @param {number} [params.stipendMax] - Maximum stipend amount
   * @param {string} [params.deadlineBefore] - Filter by deadline before date (ISO format)
   * @param {string} [params.deadlineAfter] - Filter by deadline after date (ISO format)
   * @param {boolean} [params.featured] - Filter featured opportunities
   * @returns {Promise<Array>} List of internships
   */
  async getInternships(params = {}) {
    try {
      // Map type/opportunityType to jobType if provided
      const queryParams = { ...params };
      if (params.type) queryParams.jobType = params.type;
      if (params.opportunityType) queryParams.jobType = params.opportunityType;
      
      const response = await api.get('/v1/job', { params: queryParams });
      return response.data;
    } catch (error) {
      console.error('Get internships failed:', error);
      throw error;
    }
  }

  /**
   * Create a new internship
   * @param {Object} internshipData - The internship data to create
   * @returns {Promise<Object>} The created internship
   */
  async createInternship(internshipData) {
    try {
      const response = await api.post('/v1/job', internshipData);
      return response.data;
    } catch (error) {
      console.error('Create internship failed:', error);
      throw error;
    }
  }

  /**
   * Get a single internship by ID
   * @param {string} id - The internship ID
   * @returns {Promise<Object>} The internship data
   */
  async getInternshipById(id) {
    try {
      const response = await api.get(`/v1/job/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get internship ${id} failed:`, error);
      throw error;
    }
  }

  /**
   * Update an existing internship
   * @param {string} id - The internship ID
   * @param {Object} data - The updated internship data
   * @returns {Promise<Object>} The updated internship
   */
  async updateInternship(id, data) {
    try {
      const response = await api.put(`/v1/job/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Update internship ${id} failed:`, error);
      throw error;
    }
  }

  /**
   * Partially update an internship
   * @param {string} id - The internship ID
   * @param {Object} data - The fields to update
   * @returns {Promise<Object>} The updated internship
   */
  async patchInternship(id, data) {
    try {
      const response = await api.patch(`/v1/job/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Patch internship ${id} failed:`, error);
      throw error;
    }
  }

  /**
   * Delete an internship
   * @param {string} id - The internship ID to delete
   * @returns {Promise<Object>} The deletion status
   */
  async deleteInternship(id) {
    try {
      const response = await api.delete(`/v1/job/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Delete internship ${id} failed:`, error);
      throw error;
    }
  }

  /**
   * Get featured internships
   * @param {number} [limit=10] - Maximum number of featured internships to return
   * @returns {Promise<Array>} List of featured internships
   */
  async getFeaturedInternships(limit = 10) {
    return this.getInternships({
      featured: true,
      offset: limit,
      pageNo: 1
    });
  }

  /**
   * Get internships by company
   * @param {string} company - Company name to filter by
   * @param {Object} [options] - Additional options
   * @param {number} [options.limit=10] - Maximum number of results
   * @param {number} [options.page=1] - Page number
   * @returns {Promise<Array>} List of internships for the company
   */
  async getInternshipsByCompany(company, { limit = 10, page = 1 } = {}) {
    return this.getInternships({
      freeText: company,
      offset: limit,
      pageNo: page
    });
  }

  /**
   * Search internships with free text
   * @param {string} query - Search query
   * @param {Object} [options] - Additional options
   * @param {number} [options.limit=10] - Maximum number of results
   * @param {number} [options.page=1] - Page number
   * @returns {Promise<Array>} Search results
   */
  async searchInternships(query, { limit = 10, page = 1 } = {}) {
    return this.getInternships({
      freeText: query,
      offset: limit,
      pageNo: page
    });
  }

  // DELETE - Delete internship
  async deleteInternship(id) {
    try {
      const response = await api.delete(`/internships/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Delete internship ${id} failed:`, error);
      throw error;
    }
  }

  // GET - Search internships
  async searchInternships(query, params = {}) {
    try {
      const response = await api.get('/internships/search', {
        params: { q: query, ...params }
      });
      return response.data;
    } catch (error) {
      console.error('Search internships failed:', error);
      throw error;
    }
  }
}
  
export default new InternshipAPIService();