'use client';

import { AiOutlineCheck } from 'react-icons/ai';
import styled, { css } from 'styled-components';
import { IButtonProps } from '../Button';
export interface IIconButton extends IButtonProps {
  size?: number;
  isCheck?: boolean;
}

const StyledIconButton = styled.div<IIconButton>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: ${({ isCheck }) =>
    isCheck ? css`rgb(16, 149, 193)` : css`rgb(255, 255, 255)`};
  border: 1px solid ${({ isCheck }) => (!isCheck ? css`rgb(16, 149, 193)` : css`rgb(0, 0, 0)`)};
  box-sizing: border-box;
`;

export const CheckBoxIcon = (props: IIconButton) => {
  return (
    <>
      <StyledIconButton {...props} isCheck={true}>
        <AiOutlineCheck color="white" />
      </StyledIconButton>
    </>
  );
};

export const CheckBoxOutlineBlankIcon = (props: IIconButton) => {
  return (
    <>
      <StyledIconButton {...props} isCheck={false}></StyledIconButton>
    </>
  );
};

export default undefined;
