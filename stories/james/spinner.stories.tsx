import { StoryObj, Meta } from '@storybook/react';
import { useEffect } from 'react';
import GlobalSpinner from '@components/organisms/GlobalSpinner';
import GlobalSpinnerContextProvider, {
  useGlobalSpinnerActionsContext,
} from '@context/GlobalSpinnerContext';

type Story = StoryObj<typeof GlobalSpinner>;

const Spinner = () => {
  return (
    <>
      <GlobalSpinnerContextProvider>
        <ChildComponent />
      </GlobalSpinnerContextProvider>
    </>
  );
};

const meta = {
  component: Spinner,
  title: 'spinner',
  // paramters는 정적인 메타데이터, feature와 addon을 제어함.
  // Story parameters > Components parameters > Global parameters 순서대로 적용됨.
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    isLoading: { control: 'bool' },
  },
} satisfies Meta<typeof Spinner>;

const ChildComponent = () => {
  const setGlobalSpinnerOn = useGlobalSpinnerActionsContext();

  useEffect(() => {
    setGlobalSpinnerOn(true);
    setTimeout(() => {
      setGlobalSpinnerOn(false);
    }, 5000);
  }, []);
  return (
    <>
      <GlobalSpinner />
    </>
  );
};

export const MySpinner: Story = {
  render: Spinner,
  args: {
    isLoading: true,
  },
  argTypes: {
    isLoading: {
      description: 'aa', // description은 tags: ['autodocs']을 설정하면 Docs에서 확인가능.
    },
  },
};

export default meta;
