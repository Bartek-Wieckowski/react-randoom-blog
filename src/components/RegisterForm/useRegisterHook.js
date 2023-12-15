import { useMutation } from '@tanstack/react-query';
import { signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const navigate = useNavigate();
  const { mutate: register, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success('Konto utworzone prawidłowo!');
      navigate('/logowanie');
    },
  });

  return { register, isLoading };
}
