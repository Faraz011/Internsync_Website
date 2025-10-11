// hooks/useInternshipAPI.js
import { useState, useCallback } from 'react';
import internshipAPI from '../services/internshipAPI';

export const useInternshipAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createInternship = useCallback(async (internshipData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await internshipAPI.createInternship(internshipData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getInternships = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await internshipAPI.getInternships(params);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateInternship = useCallback(async (id, updateData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await internshipAPI.updateInternship(id, updateData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteInternship = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await internshipAPI.deleteInternship(id);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    createInternship,
    getInternships,
    updateInternship,
    deleteInternship,
    clearError
  };
};
