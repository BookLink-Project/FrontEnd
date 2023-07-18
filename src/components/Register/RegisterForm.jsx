import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Styled from './Styled';
import { useState /*useRef, useEffect */ } from 'react';
import AddressSearchForm from '../AddressSearch/AddressSearchForm';
import { registerSchema } from '../../validators/authValidator';
import { useNavigate } from 'react-router-dom';
import {
  emailAuth,
  signUp,
  AuthNumConfirm,
  emailDoubleCheck,
  nicknameDoubleCheck,
} from '../../lib/apis/authService';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const [doubleEmailCheck, setDoubleEmailCheck] = useState(false);
  const [searchBtnClick, setSearchBtnClick] = useState(false);
  const onSubmit = async (data) => {
    const {
      email,
      password,
      nickname,
      birth,
      name,
      basicAddress,
      detailAddress,
    } = data;
    const address = basicAddress + ' ' + detailAddress;
    const data1 = await signUp({
      email,
      password,
      nickname,
      name,
      birth,
      address,
    });
    console.log(data1);
    navigate('/login');
  };
  const handleAddressClick = (address) => {
    console.log(getValues('basicAddress'));
    setValue('basicAddress', address, { shouldValidate: true });
    console.log(getValues('basicAddress'));
    setSearchBtnClick(false);
  };
  const handleEmailCheck = async () => {
    console.log(getValues('email'));
    const data1 = await emailDoubleCheck(getValues('email'));
    if (data1) setDoubleEmailCheck(true);
    console.log(data1);
  };
  const handleAuthNum = async () => {
    console.log(getValues('email'));
    const data1 = await emailAuth(getValues('email'));
    console.log(data1);
  };
  const handleAuthNumConfirm = async () => {
    console.log(getValues('authNum'));
    const data1 = await AuthNumConfirm(
      getValues('email'),
      getValues('authNum')
    );
    console.log(data1);
  };
  const nicknameCheck = async () => {
    console.log(getValues('nickname'));
    const data1 = await nicknameDoubleCheck(getValues('nickname'));
    console.log(data1);
  };
  return (
    <Styled.MainDiv>
      <Styled.RegisterDiv>
        <h1>회원가입</h1>
        <Styled.RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <Styled.buttonIncludedDiv>
            <h4>아이디</h4>
            <Styled.Input
              type="text"
              {...register('email')}
              //{...emailRegister}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEmailCheck();
              }}
              //ref={emailRef}
              placeholder="이메일을 입력해주세요"
            />
            {errors.email && <p>{errors.email.message}</p>}
            {doubleEmailCheck ? (
              <button type="button" onClick={handleAuthNum}>
                인증번호 전송
              </button>
            ) : (
              <button type="button" onClick={handleEmailCheck}>
                중복확인
              </button>
            )}
          </Styled.buttonIncludedDiv>
          <Styled.noTagDiv>
            <Styled.Input
              type="text"
              {...register('authNum')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAuthNumConfirm();
              }}
              //ref={authNumRef}
            />
            {errors.authNum && <p>{errors.authNum.message}</p>}
            <button type="button" onClick={handleAuthNumConfirm}>
              인증번호 확인
            </button>
          </Styled.noTagDiv>
          <Styled.Div>
            <h4>비밀번호</h4>
            <Styled.Input type="password" {...register('password')} />
            {errors.password && <p>{errors.password.message}</p>}
          </Styled.Div>
          <Styled.Div>
            <h4>비밀번호 확인</h4>
            <Styled.Input type="password" {...register('checkpw')} />
            {errors.checkpw && <p>{errors.checkpw.message}</p>}
          </Styled.Div>
          <Styled.buttonIncludedDiv>
            <h4>닉네임</h4>
            <Styled.Input
              type="text"
              {...register('nickname')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') nicknameCheck();
              }}
              //ref={nicknameRef}
            />
            {errors.nickname && <p>{errors.nickname.message}</p>}
            <button type="button" onClick={nicknameCheck}>
              중복확인
            </button>
          </Styled.buttonIncludedDiv>
          <Styled.Div>
            <h4>이름</h4>
            <Styled.Input type="text" {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
          </Styled.Div>
          {/*<Styled.Div>
            <h4>성별</h4>
            <Styled.genderDiv>
              <input
                type="radio"
                value="남성"
                {...register('gender')}
                checked
              />
              <label htmlFor="male">남성</label>
              <input type="radio" value="여성" {...register('gender')} />
              <label htmlFor="female">여성</label>
            </Styled.genderDiv>
            </Styled.Div>*/}
          <Styled.Div>
            <h4>생년월일</h4>
            <Styled.Input type="date" {...register('birth')} />
            {errors.birth && <p>{errors.birth.message}</p>}
          </Styled.Div>
          <Styled.searchDiv>
            <h4>주소</h4>
            <Styled.Input type="search" placeholder="도로명 검색" />
            <button
              type="button"
              onClick={() => {
                setSearchBtnClick(!searchBtnClick);
              }}
            >
              검색하기
            </button>
            {searchBtnClick && (
              <AddressSearchForm onAddressClick={handleAddressClick} />
            )}
          </Styled.searchDiv>
          <Styled.Div>
            <Styled.Input
              {...register('basicAddress')}
              //ref={basicAddressRef}
              type="text"
            />
            {errors.basicAddress && <p>{errors.basicAddress.message}</p>}
          </Styled.Div>
          <Styled.Div>
            <Styled.Input
              type="text"
              placeholder="상세 주소 입력하기"
              {...register('detailAddress')}
            />
            {errors.detailAddress && <p>{errors.detailAddress.message}</p>}
          </Styled.Div>
          <Styled.RegisterBtn type="sumbit">가입하기</Styled.RegisterBtn>
        </Styled.RegisterForm>
      </Styled.RegisterDiv>
    </Styled.MainDiv>
  );
};

export default RegisterForm;
