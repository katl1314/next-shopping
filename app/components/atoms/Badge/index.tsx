'use client';

import styled from 'styled-components';

interface IBadgeProps {
  /**
   * Badge내 들어갈 문구
   */
  content: string;
  /**
   * 뱃지 색상
   */
  backgroundColor: string;
}

// Omit<propsType, ...propKey> : propsType내 propKey를 제외한 나머지 타입으로 구성함.
const BadgeWrapper = styled.div<Omit<IBadgeProps, 'content'>>`
  border-radius: 20px;
  height: 20px;
  min-width: 20px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const BadgeText = styled.p`
  color: white;
  font-size: 11px;
  user-select: none;
`;

const Badge = ({ content, backgroundColor }: IBadgeProps) => {
  return (
    <BadgeWrapper backgroundColor={backgroundColor}>
      <BadgeText>{content}</BadgeText>
    </BadgeWrapper>
  );
};

export default Badge;
