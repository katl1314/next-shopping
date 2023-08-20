import { Metadata } from 'next';
import Box from '@components/layout/Box';
import Flex from '@components/layout/Flex';
import Grid from '@components/layout/Grid';

export const metadata: Metadata = {
  title: 'wrapper Components 테스트',
};

export default function Page() {
  return (
    <div>
      <Box width="200px" height="300px" marginTop="10px" backgroundColor="secondary">
        <span>Box 테스트</span>
      </Box>
      <Flex width="200px" height="300px">
        <span>Flex 테스트</span>
      </Flex>
      {/* grid-container : grid-item을 감싸는 놈 */}
      {/* fr 전체 요소에서 남은 것을 나눈다? */}
      <Grid gridTemplateColumns="auto 200px 2fr" gridTemplateRows="30px 30px 30px" gridGap="16px">
        {/* grid-item */}
        <span>테스트1</span>
        <span>테스트2</span>
        <span>테스트3</span>
        <span>테스트4</span>
        <span>테스트5</span>
        <span>테스트6</span>
        <span>테스트7</span>
        <span>테스트8</span>
        <span>테스트9</span>
      </Grid>
    </div>
  );
}
