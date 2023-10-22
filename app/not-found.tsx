import Box from './components/layout/Box';
import logger from './utils/logger';

const NotFound = () => {
  logger.info('NotFound 컴포넌트 렌더링 함수에서 호출한다.');
  return <Box>존재하지 않은 페이지에 접근할 경우 not-found.tsx을 생성해서 처리한다.</Box>;
};

export default NotFound;
