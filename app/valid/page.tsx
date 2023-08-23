import { useForm, SubmitHandler } from 'react-hook-form';

interface IForm {
  firstName: string;
  lastName: string;
  category: string;
}

export default function Page() {
  // submit 이벤트 처리
  // useForm을 호출하면 register, handleSubmit, formState값을 객체로 받는다.
  // 제네릭을 이용하여 폼 데이터의 인터페이스를 정의한다.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = data => {
    // submit시 처리한다.
    console.info(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 반드시 필수로 입력해야함. */}
      <input {...register('firstName', { required: true })} placeholder="이름" />
      {errors.firstName && <div>이름을 입력하시오.</div>}
      <input {...register('lastName', { required: true })} placeholder="성" />
      {errors.lastName && <div>성을 입력하시오.</div>}
      <select {...register('category', { required: true })}>
        <option value="">선택...</option>
        <option value="a">카테고리 A</option>
        <option value="b">카테고리 B</option>
      </select>
      {errors.category && <div>카테고리를 선택하세요.</div>}
      <input type="submit" value="전달" />
    </form>
  );
}
