import { useQuery } from '@tanstack/react-query';
import { getCurrentPostIDfromSupabase } from '../services/apiComments';

export function usePostId(postIdFromContentful) {
  const { data: postIdFromSupa } = useQuery({
    queryKey: ['postIdNumOfComments', postIdFromContentful],
    queryFn: () => getCurrentPostIDfromSupabase(postIdFromContentful),
    enabled: postIdFromContentful !== undefined,
  });
  return { postIdFromSupa };
}
