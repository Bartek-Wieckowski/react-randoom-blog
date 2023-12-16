import { Link } from 'react-router-dom';
import './showcase.scss';
import noSetImg from '../../assets/noSetImg.png';
import { useUser } from '../../auth/useUserHook';

export default function Showcase() {
  const { user } = useUser();

  return (
    <div className="profile">
      {user && user.user_metadata ? (
        <>
          <img src={user.user_metadata.avatar || noSetImg} alt="" />
          <div className="name">
            <span>Witaj</span>
            <h3>
              <Link to="">
                {user.user_metadata.nickName || user.user_metadata.fullName}
              </Link>
            </h3>
          </div>
        </>
      ) : (
        <>
          <img src="" alt="" className="no-visibility" />
          <div className="no-visibility">
            <span></span>
            <h3>
              <Link to=""></Link>
            </h3>
          </div>
        </>
      )}
    </div>
  );
}
