import { useForm } from 'react-hook-form';
import './comment-form.scss';
import { useUser } from '../../auth/useUserHook';
import { usePosts } from '../../contexts/PostsContext';
import {
  addCommentCurrentPostAPI,
  getCurrentPostIDfromSupabase,
} from '../../services/apiComments';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function CommentForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors, isSubmitting } = formState;
  const { user, isAuthenticated } = useUser();
  const { currentPost } = usePosts();
  const { postID: postIdFromContentful } = currentPost;
  const [initialUserName, setInitialUserName] = useState('');

  const { data: postIdFromSupa } = useQuery({
    queryKey: ['postIDfromSupa', postIdFromContentful],
    queryFn: () => getCurrentPostIDfromSupabase(postIdFromContentful),
  });

  const handleCommentSubmit = async (data) => {
    try {
      await addCommentCurrentPostAPI({
        ...data,
        postIDContentful: postIdFromContentful,
        postID: postIdFromSupa[0].id,
        userID: user?.id || uuidv4(),
      });
      reset();
    } catch (error) {
      throw new Error(`Błąd podczas dodawania komenatrza ${error}`);
    }
  };

  useEffect(() => {
    const loadInitialUserName = async () => {
      if (isAuthenticated) {
        const userNameValue =
          user?.user_metadata.nickName || user?.user_metadata.fullName;
        setInitialUserName(userNameValue || '');
      } else {
        setInitialUserName('anonim_' + Date.now());
      }
    };

    loadInitialUserName();
  }, [isAuthenticated, user]);

  return (
    <div className="comment-form">
      <h3>Dodaj swój komentarz</h3>
      <form onSubmit={handleSubmit(handleCommentSubmit)}>
        <div className="wrapper">
          <div>
            <input
              type="text"
              placeholder="Imię / nickname"
              id="userName"
              defaultValue={initialUserName}
              {...register('userName')}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              id="userEmail"
              defaultValue={isAuthenticated ? user.email : ''}
              {...register('userEmail')}
            />
          </div>
        </div>
        <div className="co-textarea">
          <textarea
            placeholder="Wpisz swój komentarz"
            rows="10"
            id="commentContent"
            {...register('commentContent', {
              required: 'To pole jest obowiązkowe',
            })}
          ></textarea>
          <p className="error-text">{errors?.commentContent?.message}</p>
        </div>
        {/* //TODO: do zrobienia dla zarejestrowanych uzytkownikow  */}
        {/* <p className="co-cookies">
      <input type="checkbox" id="cookies" />
      <label for="cookies">Zapisz mój komentarz</label>
    </p> */}
        <p className="co-submit">
          <input
            type="submit"
            value="Wyślij"
            className="btn submit read-more"
            disabled={isSubmitting}
          />
        </p>
      </form>
    </div>
  );
}
