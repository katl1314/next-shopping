'use client';

import Link from 'next/link';
import styled from 'styled-components';
import AppLogo from '../../atoms/AppLogo';
import { SearchIcon, ShoppingCartIcon, SignInIcon } from '../../atoms/IconButton';
import { useAuthContext } from '@/app/context/AuthContext';
import Button from '@components/atoms/Button';
import ShapeImage from '@components/atoms/ShapeImage';
import Box from '@components/layout/Box';
import Flex, { FlexLayout } from '@components/layout/Flex';

// 헤더
const HeaderWrap = styled.header`
  height: 80px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  position: fixed;
  z-index: 99;
`;

// 네비게이션
const Nav = styled(FlexLayout)`
  & > span:not(:first-child) {
    margin: 0 10px;
  }
`;

// 네비게이션 링크
const NavLink = styled.span`
  display: inline;
`;

const Header = () => {
  const { authUser } = useAuthContext();
  return (
    <HeaderWrap>
      <Flex
        paddingleft={3}
        paddingright={3}
        height="100%"
        alignitems="center"
        justifycontent={{ md: 'space-around', base: 'space-between' }}
      >
        <Nav as="nav" height="56px" alignitems={'center'} flexgrow={{ base: '2', md: '0' }}>
          <NavLink>
            <Link href="/" passHref>
              <AppLogo />
            </Link>
          </NavLink>
          <NavLink>
            <Box
              display={{ base: 'none', md: 'block' }}
              paddingleft={{ base: '5px', md: '10px' }}
              paddingright={{ base: '5px', md: '10px' }}
            >
              <Link href="/search/all">모두</Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box
              display={{ base: 'none', md: 'block' }}
              paddingleft={{ base: '5px', md: '10px' }}
              paddingright={{ base: '5px', md: '10px' }}
            >
              <Link href="/search/clothes">의류</Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box
              display={{ base: 'none', md: 'block' }}
              paddingleft={{ base: '5px', md: '10px' }}
              paddingright={{ base: '5px', md: '10px' }}
            >
              {/* next/link passHref속성은 Link컴포넌트의 속성 href을 자식 컴포넌트에 전달. */}
              <Link href="/search/book">책</Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box
              display={{ base: 'none', md: 'block' }}
              paddingleft={{ base: '5px', md: '10px' }}
              paddingright={{ base: '5px', md: '10px' }}
            >
              <Link href="/search/shoes">신발</Link>
            </Box>
          </NavLink>
        </Nav>
        <Nav as="nav" height="56px" alignitems="center" justifycontent="space-evenly">
          <NavLink style={{ flexGrow: 1 }}>
            <Box display={{ base: 'block', md: 'none' }}>
              <Link href="/search" passHref>
                <SearchIcon />
              </Link>
            </Box>
          </NavLink>
          <NavLink style={{ flexGrow: 1 }}>
            <Link href="/cart">
              <ShoppingCartIcon />
            </Link>
          </NavLink>
          <NavLink style={{ flexGrow: 1 }}>
            {(() => {
              // 로그인 상태 => 전역 컨텍스트에 가지고 있으면
              if (authUser) {
                return (
                  <Link href={`/user/${authUser.id}`} passHref>
                    <ShapeImage
                      shape="circle"
                      alt={authUser.username}
                      src={authUser.profileImageUrl}
                      width={32}
                      height={32}
                    ></ShapeImage>
                  </Link>
                );
              } else {
                // 미로그인 시
                return (
                  <Link href="/signin">
                    <SignInIcon />
                  </Link>
                );
              }
            })()}
          </NavLink>
          <NavLink style={{ flexGrow: 1, margin: 0 }}>
            <Box display={{ base: 'none', md: 'block' }}>
              <Link href="/sell">
                <Button padding="5px 20px">등록</Button>
              </Link>
            </Box>
          </NavLink>
        </Nav>
      </Flex>
    </HeaderWrap>
  );
};

export default Header;
