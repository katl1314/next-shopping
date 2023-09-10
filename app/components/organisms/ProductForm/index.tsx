'use client';
// react-hook-form의 경우 react context api를 사용하므로 use client를 명시한다.
import { Controller, useForm } from 'react-hook-form';
import type { Category, Condition } from '../../../types';
// import Dropzone from '../../molecules/Dropzone';
import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import Text from '@components/atoms/Text';
import TextArea from '@components/atoms/Textarea';
import Box from '@components/layout/Box';
import Dropdown from '@components/molecules/Dropdown';

export interface IProductFormData {
  image: File[];
  title: string;
  description: string;
  category: Category;
  condition: Condition;
  price: number;
}

export interface IProductFormProps {
  /**
   * 등록 버튼 클릭시 이벤트 핸들러
   * @param data 제품 정보
   * @returns
   */
  onProductSave: (data: IProductFormData) => void;
}

/**
 * 상품 등록 Form
 */

const ProductForm = (props: IProductFormProps) => {
  const onProductSave = props.onProductSave;
  // mode : 사용자가 form을 submit하기 전에 유효성 검사를 구성한다.
  const {
    register, // 입력 또는 선택 요소 등록하고 유효성 검사 규칙을 react-hook-form에 등록
    handleSubmit, // 실제 submit하는 이벤트 함수
    control,
    reset,
    formState: { errors }, // register에 validation을 지정하고, validation통과시 빈객체, 실패시 해당 에러정보를 담은 객체를 반환한다.
  } = useForm<IProductFormData>({
    defaultValues: {}, //기본값
    mode: 'all', // 'all' | 'onSubmit' | 'onChange' | 'onBlur' <= 어느 시점에 validation을 검사할지...
  });

  const onSubmit = (data: IProductFormData) => {
    onProductSave && onProductSave(data);
  };

  // 'used' | 'new'
  const conditionItems = [
    { label: '중고', value: 'used' },
    { label: '신상품', value: 'new' },
  ];

  // 'shoes' | 'clothes' | 'book'
  const categoryItems = [
    { label: '신발', value: 'shoes' },
    { label: '의류', value: 'clothes' },
    { label: '도서', value: 'book' },
  ];

  return (
    <Box width="60%" style={{ margin: '0 auto' }}>
      <form {...register} onSubmit={handleSubmit(onSubmit)}>
        {/* 상품 사진 */}
        {/* <Box marginbottom={3}>
          <Box marginbottom={2}>
            <Text variant="mediumLarge" fontWeight="bold">
              상품사진
            </Text>
          </Box>
          <Controller
            control={control}
            name="image"
            rules={{ required: true }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Dropzone
                id="inputImages"
                accept={['image/*']}
                hasError={!!error}
                onChange={onChange}
              />
            )}
          />
          {errors.image && (
            <Text color="danger" variant="small" paddingleft={1}>
              Product image is required
            </Text>
          )}
        </Box> */}
        <Box>
          {/* 상품 정보 */}
          <Box style={{ marginBottom: '10px' }}>
            <Text variant="mediumLarge" fontWeight="bold">
              상품 정보
            </Text>
          </Box>
          {/* 제목 */}
          <Box>
            <Text variant="medium">제목</Text>
            {/* 상품 제목 입력 */}
            <Input
              {...register('title', {
                required: true,
              })}
              name="title"
              type="text"
              placeholder="제목"
              hasError={!!errors.title}
            ></Input>
            {errors.title && (
              <Text variant="small" color="danger">
                제목 입력은 필수입니다.
              </Text>
            )}
          </Box>
          {/* 개요 */}
          <Box>
            <Text variant="medium">개요</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              name="description"
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <TextArea placeholder="최고의 상품입니다." hasError={!!error} onChange={onChange}>
                    {value}
                  </TextArea>
                );
              }}
            />
            {errors.description && (
              <Text variant="small" color="danger">
                개요 입력은 필수입니다.
              </Text>
            )}
          </Box>
          {/* 카테고리 */}
          <Box>
            <Text variant="medium">카테고리</Text>
            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              defaultValue="shoes"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Dropdown
                  id="category"
                  variant="medium"
                  hasError={!!error}
                  items={categoryItems}
                  placeholder="카테고리를 선택하세요"
                  onChange={v => onChange(v?.value)}
                  value={value}
                />
              )}
            />
            {errors.category && (
              <Text variant="small" color="danger">
                카테고리를 선택하세요.
              </Text>
            )}
          </Box>
          {/* 상품 상태 */}
          <Box>
            <Text variant="medium">상품 상태</Text>
            <Controller
              control={control}
              name="condition"
              rules={{ required: true }}
              defaultValue="used"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Dropdown
                  id="condition"
                  variant="medium"
                  items={conditionItems}
                  hasError={!!error}
                  placeholder="상품 상태를 선택하세요"
                  onChange={v => onChange(v?.value)}
                  value={value}
                />
              )}
            />
            {errors.condition && (
              <Text variant="small" color="danger">
                상품 상태를 선택하세요.
              </Text>
            )}
          </Box>
          {/* 가격 */}
          <Box>
            <Text variant="medium">가격</Text>
            <Input
              {...register('price', { required: true })}
              name="price"
              type="number"
              placeholder="가격을 입력하세요."
              hasError={!!errors.price}
            />
            {errors.price && (
              <Text color="danger" variant="small">
                가격 입력은 필수입니다.
              </Text>
            )}
          </Box>
        </Box>
        <Box margintop={'5px'}>
          <Button type="submit" width="50%">
            등록
          </Button>
          <Button type="button" width="50%" variant="danger" onClick={() => reset()}>
            초기화
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
