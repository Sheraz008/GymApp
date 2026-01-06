import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SLOTS_SERVICE } from '../api/service/slots.service';
import Toast from 'react-native-toast-message';

export const useGetSlots = (date: string) => {
  return useQuery({
    queryKey: ['slots', date],
    queryFn: async () => {
      const response = await SLOTS_SERVICE.getByDate(date);
      return response.data;
    },
    enabled: !!date,
  });
};

export const useCreateSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { date: string; startTime: string; endTime: string }) =>
      SLOTS_SERVICE.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['slots'] });
      Toast.show({
        type: 'success',
        text1: 'Slot Created',
        text2: 'Availability slot has been added successfully! ✅',
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to create slot. Please try again.',
      });
    },
  });
};

export const useDeleteSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => SLOTS_SERVICE.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slots'] });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Slot deleted successfully',
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to delete slot',
      });
    },
  });
};
