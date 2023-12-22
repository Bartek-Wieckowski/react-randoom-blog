import { useQuery } from '@tanstack/react-query';
import { getNumberCommentPost } from '../services/apiComments';

export function usePostNumOfComments(postIdFromSupa) {
  const { data: numOfComments } = useQuery({
    queryKey: ['numOfComments', postIdFromSupa],
    queryFn: () => getNumberCommentPost(postIdFromSupa),
    enabled: postIdFromSupa !== undefined,
  });
  return { numOfComments };
}
