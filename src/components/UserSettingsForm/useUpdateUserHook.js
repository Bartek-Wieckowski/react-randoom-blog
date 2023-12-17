import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: ({ user }) => {
      toast.success('Dane użytownika zaktualizowane poprawnie!');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => {
      toast.error('Wystąpił błąd podczas aktualizacji');
    },
  });
  return { updateUser, isUpdating };
}
