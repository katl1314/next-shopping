import ShapeImage from '@components/atoms/ShapeImage';
import Text from '@components/atoms/Text';
import Box from '@components/layout/Box';
import Flex from '@components/layout/Flex';

interface IUserProfileProps {
  /**
   * 변형 (표지 스타일) Optional => default props normal
   */
  variant?: 'normal' | 'small';

  /**
   * 사용자명
   */
  username: string;

  /**
   * 사용자 이미지 URL
   */
  profileImageUrl: string;

  /**
   * 사용자가 소유한 상품 수
   */
  numberOfProducts: number;

  /**
   * 사용자 설명
   */
  description?: string;
}

const UserProfile = ({
  variant,
  username,
  profileImageUrl,
  numberOfProducts,
  description,
}: IUserProfileProps) => {
  const profileImageSize = variant === 'small' ? '100' : '120';
  console.log(description);

  return (
    <Flex>
      <Box minwidth={`${profileImageSize}px`}>
        {/* 이미지 */}
        <ShapeImage
          shape="circle"
          src={profileImageUrl}
          alt={username}
          width={profileImageSize}
          height={profileImageSize}
          quality={80} // 최적화된 이미지 품질
          placeholder="empty" // 이미지 로딩시 표시할 것.
        ></ShapeImage>
      </Box>
      <Flex flexdirection="column" justifycontent="center" paddingleft="5px">
        <Box>
          <Text fontSize="24px" fontWeight="bold">
            {username}
          </Text>
        </Box>
        <Box>
          <Text>{numberOfProducts}개 제품 게시 완료</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default UserProfile;
