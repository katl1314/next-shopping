import '../../globals.css';
import type { Metadata } from 'next';
import StyledComponentsRegistry from '../../lib/registry';
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
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </Box>
  );
}

type Props = {
  params: { slug: string };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const {
    params: { slug },
  } = props;
  return {
    title: `${slug} 검색`,
    description: '설명',
  };
};
