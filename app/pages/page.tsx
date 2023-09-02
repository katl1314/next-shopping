import { Metadata } from 'next';
import Checkbox from '../components/molecules/Checkbox';
import Dropdown from '../components/molecules/Dropdown';
import Text from './Text';

// metadata를 사용하여 페이지에 정보를 추가하려면 ssg + ssr + isr만 제공함
export const metadata: Metadata = {
  title: 'wrapper Components 테스트',
};

const dropdownItem = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
];

export default function Page() {
  return (
    <div>
      <Checkbox checkLabel="승인" unCheckLabel="미승인" checked={true}></Checkbox>
      <Checkbox checkLabel="승인" unCheckLabel="미승인" checked={false}></Checkbox>
      <Dropdown id="combo" items={dropdownItem} placeholder="테스트"></Dropdown>
      <Text />
    </div>
  );
}
