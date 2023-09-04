'use client';

import Link from 'next/link';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import ShapeImage from '../../atoms/ShapeImage';
import Spinner from '../../atoms/Spinner';
import Text from '../../atoms/Text';
import Box from '../../layout/Box';
import Flex from '../../layout/Flex';
import { SearchIcon, ShoppingCartIcon } from '../../atoms/IconButton';
import { useAuthContext } from '@/app/context/AuthContext';

// 헤더
const HeaderWrap = styled.header`
  height: 80px;
  padding: 10px 25px;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
`;

// 네비게이션
const Nav = styled(Flex)`
  & > span:not(:first-child) {
    margin-left: 5px;
  }
`;

// 네비게이션 링크
const NavLink = styled.span`
  display: inline;
`;

// 앵커 태그
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  // const { cart } = useShoppingCartContext();
  const { authUser, isLoading } = useAuthContext();
  return (
    <HeaderWrap>
      <Flex paddingLeft={3} paddingRight={3} justifyContent={'space-between'}>
        <Nav as="nav" height="56px" alignItems={'center'}>
          <NavLink>
            <Link href="/" passHref>
              <Anchor fontSize={32} fontWeight="700">
                ShoppingMall
              </Anchor>
            </Link>
          </NavLink>
          <NavLink>
            <Box
              display={{ base: 'none', md: 'block' }}
              paddingLeft={{ base: '5px', md: '10px' }}
              paddingRight={{ base: '5px', md: '10px' }}
            >
              <Link href="/search/all" passHref>
                <Anchor fontSize={24} fontWeight="700">
                  모두
                </Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box
              display={{ base: 'none', md: 'block' }}
              paddingLeft={{ base: '5px', md: '10px' }}
              paddingRight={{ base: '5px', md: '10px' }}
            >
              <Link href="/search/clothes" passHref>
                <Anchor fontSize={24} fontWeight="700">
                  의류
                </Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box
              display={{ base: 'none', md: 'block' }}
              paddingLeft={{ base: '5px', md: '10px' }}
              paddingRight={{ base: '5px', md: '10px' }}
            >
              {/* next/link passHref속성은 Link컴포넌트의 속성 href을 자식 컴포넌트에 전달. */}
              <Link href="/search/books" passHref>
                <Anchor fontSize={24} fontWeight="700">
                  책
                </Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box
              display={{ base: 'none', md: 'block' }}
              paddingLeft={{ base: '5px', md: '10px' }}
              paddingRight={{ base: '5px', md: '10px' }}
            >
              <Link href="/search/shoes" passHref>
                <Anchor fontSize={24} fontWeight="700">
                  신발
                </Anchor>
              </Link>
            </Box>
          </NavLink>
        </Nav>
        <Nav as="nav" height="58px" alignItems="center">
          <NavLink>
            <Box display={{ base: 'block', md: 'none' }}>
              <Link href="/search" passHref>
                <Anchor fontSize={24} fontWeight="700">
                  <SearchIcon />
                </Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            {(() => {
              // 로그인 상태 => 전역 컨텍스트에 가지고 있으면
              if (authUser) {
                return (
                  <Link href={`/user/${authUser.id}`} passHref>
                    <Anchor as="a">
                      <ShapeImage
                        shape="circle"
                        alt={authUser.username}
                        src={authUser.profileImageUrl}
                        width={24}
                        height={24}
                      ></ShapeImage>
                    </Anchor>
                  </Link>
                );
              } else if (isLoading) {
                // 로그인 중
                return <Spinner isLoading={isLoading} color="red" size={24} />;
              } else {
                // 미로그인 시
                return (
                  <Link href="/signin" passHref>
                    <Anchor as="a">로그인</Anchor>
                  </Link>
                );
              }
            })()}
          </NavLink>
        </Nav>
      </Flex>
    </HeaderWrap>
  );
};

export default Header;
