import { Metadata } from 'next';
// import Button from '../components/atoms/Button';
// import Input from '../components/atoms/Input';
// import ShapeImage from '../components/atoms/ShapeImage';
import Checkbox from '../components/molecules/Checkbox';
import Dropdown from '../components/molecules/Dropdown';
import Dropzone from '../components/molecules/Dropzone';
// import Box from '@components/layout/Box';
// import Flex from '@components/layout/Flex';
// import Grid from '@components/layout/Grid';

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
      {/* <Box width="200px" height="300px" marginTop="10px" backgroundColor="secondary">
        <span>Box 테스트</span>
      </Box>
      <Flex width="200px" height="300px">
        <span>Flex 테스트</span>
      </Flex>
      <Grid gridTemplateColumns="auto 200px 2fr" gridTemplateRows="30px 30px 30px" gridGap="16px">
        <span>테스트1</span>
        <span>테스트2</span>
        <span>테스트3</span>
        <span>테스트4</span>
        <span>테스트5</span>
        <span>테스트6</span>
        <span>테스트7</span>
        <span>테스트8</span>
        <span>테스트9</span>
      </Grid>
      <Button variant="secondary">테스트</Button> */}
      {/* <Input type="text" hasBorder={true} maxLength={10} color="#000"></Input> */}
      {/* Next13에서는 public 폴더에 static asset을 추가한다. src으로 참조시 public기준으로 참조가능. */}
      {/* <Flex justifyContent="space-around">
        <ShapeImage src="/images/1.jpg" shape="circle" alt="과일" width={100} height={100} />
        <ShapeImage src="/images/2.jpg" shape="circle" alt="과일" width={100} height={100} />
      </Flex> */}
      <Checkbox checkLabel="승인" unCheckLabel="미승인" checked={true}></Checkbox>
      <Checkbox checkLabel="승인" unCheckLabel="미승인" checked={false}></Checkbox>
      <Dropdown id="combo" items={dropdownItem} placeholder="테스트"></Dropdown>
      <Dropzone id="dropzone" width={500} height={300} accept={['text/plain']}></Dropzone>
    </div>
  );
}
