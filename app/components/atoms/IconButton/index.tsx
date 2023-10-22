'use client';

import { AiOutlineCheck, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { PiSignIn } from 'react-icons/pi';
import styled, { css } from 'styled-components';
import { IButtonProps } from '../Button';
export interface IIconButton extends IButtonProps {
  size?: number;
  checked?: boolean;
}

const StyledIconButton = styled.div<IIconButton>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: ${({ checked }) =>
    checked ? css`rgb(16, 149, 193)` : css`rgb(255, 255, 255)`};
  border: 1px solid ${() => css`rgb(16, 149, 193)`};
  box-sizing: border-box;
`;

export const CheckBoxIcon = (props: IIconButton) => {
  return (
    <StyledIconButton {...props}>
      <AiOutlineCheck color="white" />
    </StyledIconButton>
  );
};

export const SearchIcon = () => {
  return <AiOutlineSearch size="32" />;
};

export const ShoppingCartIcon = () => {
  return <AiOutlineShoppingCart size="32" />;
};

export const SignInIcon = () => {
  return <PiSignIn size="32" />;
};

export default undefined;
