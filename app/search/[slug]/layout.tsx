import '../../globals.css';
import type { Metadata } from 'next';
import { Category } from '@/app/types';
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
  params: { slug: string };
};

const categoryNameDict: Record<Category, string> = {
  shoes: '신발',
  book: '책',
  clothes: '의류',
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const {
    params: { slug },
  } = props;
  const category = slug as Category;
  return {
    title: `${categoryNameDict[category] ?? '전체'} 검색`,
    description: '설명',
  };
};
