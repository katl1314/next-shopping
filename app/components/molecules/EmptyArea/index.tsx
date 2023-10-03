import Text from '@components/atoms/Text';
import Flex from '@components/layout/Flex';

const EmptyArea = () => {
  return (
    <Flex justifycontent="center">
      <Text variant="mediumLarge">저장된 상품이 없습니다.</Text>
    </Flex>
  );
};

export default EmptyArea;
