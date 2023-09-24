import UserProfile from '@/app/components/organisms/UserProfile';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserProfileContainer = ({ user }: any) => {
  const userInfo = user.read();

  return (
    <UserProfile
      username={`${userInfo.username} (${userInfo.displayName})`}
      profileImageUrl={userInfo.profileImageUrl}
      numberOfProducts={userInfo.numberOfProducts ?? 0}
      description={userInfo.description}
    />
  );
};

export default UserProfileContainer;
