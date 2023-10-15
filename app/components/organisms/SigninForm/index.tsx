'use client';
import { useForm } from 'react-hook-form';
import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import Text from '@components/atoms/Text';
import Box from '@components/layout/Box';

interface ISigninFormProps {
  onSignin: (username: string, password: string) => void;
}

interface ISigninFormData {
  username: string;
  password: string;
}

const SigninForm = ({ onSignin }: ISigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninFormData>({ mode: 'onSubmit' });
  return (
    <form onSubmit={handleSubmit(({ username, password }) => onSignin(username, password))}>
      <Box>
        <label htmlFor='username'>아이디</label>
        <Input
          type="text"
          id="username"
          placeholder="아이디"
          {...register('username', { required: '아이디는 필수입니다.' })}
          hasError={!!errors.username}
        ></Input>
        {/* validation에 체크될 경우... */}
        {errors.username && (
          <Text color="danger" variant="small">
            {errors.username.message}
          </Text>
        )}
      </Box>
      <Box>
      <label htmlFor='password'>비밀번호</label>
        <Input
          type="password"
          id="password"
          placeholder="비밀번호"
          hasError={!!errors.password}
          {...register('password', {
            required: '비밀번호 입력은 필수입니다.',
            minLength: {
              value: 5,
              message: '최소 5글자 입력합니다.',
            },
            maxLength: {
              value: 15,
              message: '최대 15글자 이내로 입력합니다.',
            },
          })}
        ></Input>
        {errors.password && (
          <Text color="danger" variant="small">
            {errors.password.message}
          </Text>
        )}
      </Box>
      <Box>
        <Button type="submit">로그인</Button>
      </Box>
    </form>
  );
};

export default SigninForm;
