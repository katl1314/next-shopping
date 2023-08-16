import { Metadata } from 'next';
import Box from '../components/layout';

export const metadata: Metadata = {
  title: 'wrapper Components 테스트',
};

export default function Page() {
  return (
    <div>
      <Box width="200px" height="300px" marginTop="10px" backgroundColor="secondary"></Box>
    </div>
  );
}
