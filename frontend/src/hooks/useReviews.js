import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '../api/reviewApi';
import { useFlash } from './useFlash';

export const useCreateReview = (listingId) => {
  const queryClient = useQueryClient();
  const { showFlash } = useFlash();

  return useMutation({
    mutationFn: (reviewData) => reviewApi.create(listingId, reviewData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['listing', listingId]);
      showFlash(data.message || 'New Review Created!', 'success');
    },
    onError: (error) => {
      showFlash(error.response?.data?.error || 'Failed to create review', 'error');
    },
  });
};

export const useDeleteReview = (listingId) => {
  const queryClient = useQueryClient();
  const { showFlash } = useFlash();

  return useMutation({
    mutationFn: (reviewId) => reviewApi.delete(listingId, reviewId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['listing', listingId]);
      showFlash(data.message || 'Review Deleted!', 'success');
    },
    onError: (error) => {
      showFlash(error.response?.data?.error || 'Failed to delete review', 'error');
    },
  });
};
