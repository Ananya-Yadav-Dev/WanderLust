import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listingApi } from '../api/listingApi';
import { useFlash } from './useFlash';
import { useNavigate } from 'react-router-dom';

export const useListings = () => {
  return useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const response = await listingApi.getAll();
      return response.data;
    },
  });
};

export const useListingDetails = (id) => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const response = await listingApi.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useListingsByCategory = (category) => {
  return useQuery({
    queryKey: ['listings', 'category', category],
    queryFn: async () => {
      const response = await listingApi.getByCategory(category);
      return response.data;
    },
    enabled: !!category,
  });
};

export const useCreateListing = () => {
  const queryClient = useQueryClient();
  const { showFlash } = useFlash();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: listingApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['listings']);
      showFlash(data.message || 'New Listing Created!', 'success');
      navigate('/');
    },
    onError: (error) => {
      showFlash(error.response?.data?.error || 'Failed to create listing', 'error');
    },
  });
};

export const useUpdateListing = () => {
  const queryClient = useQueryClient();
  const { showFlash } = useFlash();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, formData }) => listingApi.update(id, formData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['listings']);
      queryClient.invalidateQueries(['listing', variables.id]);
      showFlash(data.message || 'Listing Updated!', 'success');
      navigate(`/listings/${variables.id}`);
    },
    onError: (error) => {
      showFlash(error.response?.data?.error || 'Failed to update listing', 'error');
    },
  });
};

export const useDeleteListing = () => {
  const queryClient = useQueryClient();
  const { showFlash } = useFlash();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: listingApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['listings']);
      showFlash(data.message || 'Listing Deleted!', 'success');
      navigate('/');
    },
    onError: (error) => {
      showFlash(error.response?.data?.error || 'Failed to delete listing', 'error');
    },
  });
};
