import '../../globals.css';
import type { Metadata } from 'next';
import Box from '@components/layout/Box';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      width={{ base: '90%', md: '1075px' }}
      marginleft="auto"
      marginright="auto"
      margintop="0"
      marginbottom="0"
    >
      {children}
    </Box>
  );
}

type Props = {
  params: { id: string };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const {
    params: { id },
  } = props;
  return {
    title: `${id} 검색`,
    description: '설명',
  };
};
