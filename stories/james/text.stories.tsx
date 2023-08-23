import type { StoryObj, Meta } from '@storybook/react';
import Text from '@components/atoms/Text';

type Story = StoryObj<typeof Text>;

export const ExtraSmall: Story = {
  render: props => <Text {...props} />,
  // 각 스토리에 전달되는 인자들을 정의함.
  args: {
    variant: 'extraSmall',
  },
};

export const Small: Story = {
  render: props => <Text {...props} />,
  // 각 스토리에 전달되는 인자들을 정의함.
  args: {
    variant: 'small',
  },
};

export const Medium: Story = {
  render: props => <Text {...props} />,
  // 각 스토리에 전달되는 인자들을 정의함.
  args: {
    variant: 'medium',
  },
};

export const MediumLarge: Story = {
  render: props => <Text {...props} />,
  // 각 스토리에 전달되는 인자들을 정의함.
  args: {
    variant: 'mediumLarge',
  },
};

export const Large: Story = {
  render: props => <Text {...props} />,
  // 각 스토리에 전달되는 인자들을 정의함.
  args: {
    variant: 'large',
  },
};

export const ExtraLarge: Story = {
  render: props => <Text {...props} />,
  // 각 스토리에 전달되는 인자들을 정의함.
  args: {
    variant: 'extraLarge',
  },
};

const strings = `
로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 
그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 
시각 디자인 프로젝트 모형의 채움 글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며,
때로 로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도 사용된다.
`;

// 스토리에 대한 메타 정보 설정
const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  args: {
    color: '#5ede5e',
    children: strings,
  },
  // argTypes : 각 Story args의 행동방식 설정
  argTypes: {
    variant: {
      options: ['extraSmall', 'small', 'medium', 'mediumLarge', 'large', 'extraLarge'],
      description: '텍스트 변형', // storybook description 동작하지 않는 현상
      // defaultValue: 'medium',
      control: 'select',
      table: {
        type: {
          summary: 'extraSmall, small, medium, mediumLarge, large, extraLarge',
          defaultValue: { summary: 'extraSmall' },
        },
      },
    },
    fontWeight: {
      control: { type: 'text' },
      description: '폰트 굵기',
      table: {
        type: { summary: 'string' },
      },
    },
    lineHeight: {
      control: { type: 'text' },
      description: '줄 높이',
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      control: { type: 'color' },
      description: '폰트 색상',
      table: {
        type: { summary: 'string' },
      },
    },
    backgroundColor: {
      control: { type: 'color' },
      description: '배경 색상',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
