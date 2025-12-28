import axiosInstance from './axios';

export const listingApi = {
  getAll: async () => {
    const response = await axiosInstance.get('/listings');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/listings/${id}`);
    return response.data;
  },

  getByCategory: async (category) => {
    const response = await axiosInstance.get(`/listings/category/${category}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await axiosInstance.post('/listings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await axiosInstance.put(`/listings/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/listings/${id}`);
    return response.data;
  }
};
