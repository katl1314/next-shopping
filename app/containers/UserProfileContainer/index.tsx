import UserProfile from '@/app/components/organisms/UserProfile';
// import { IUseUser } from '@/app/services/users/use-user';
import { User } from '@/app/types';
import { isNull } from '@/app/utils/utils';

const UserProfileContainer = ({ user }: { user: User }) => {
  if (isNull(user)) return <></>;
  return (
    <UserProfile
      username={`${user.username} (${user.displayName})`}
      profileImageUrl={user.profileImageUrl}
      numberOfProducts={user.numberOfProducts ?? 0}
      description={user.description}
    />
  );
};

export default UserProfileContainer;
