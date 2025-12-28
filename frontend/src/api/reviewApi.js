import axiosInstance from './axios';

export const reviewApi = {
  create: async (listingId, reviewData) => {
    const response = await axiosInstance.post(`/listings/${listingId}/reviews`, reviewData);
    return response.data;
  },

  delete: async (listingId, reviewId) => {
    const response = await axiosInstance.delete(`/listings/${listingId}/reviews/${reviewId}`);
    return response.data;
  }
};
