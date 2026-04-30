import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../shared/InputField';
import { useDispatch } from 'react-redux';
import { registerNewUser } from '../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../shared/Spinners';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        console.log("Register Click");
        dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
     };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center font-notosans">
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <FaUserPlus className="text-slate-800 text-3xl"/>
                        <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                            회원가입
                        </h1>
                    </div>
            <hr className="mt-4 mb-5 text-black" />
            <div className="flex flex-col gap-3">
                <InputField
                    label="아이디"
                    required
                    id="username"
                    type="text"
                    message="*아이디는 필수 입력입니다."
                    placeholder="아이디를 입력해주세요."
                    register={register}
                    errors={errors}
                    />

                <InputField
                    label="이메일"
                    required
                    id="email"
                    type="email"
                    message="*이메일 필수 입력입니다."
                    placeholder="이메일을 입력해주세요."
                    register={register}
                    errors={errors}
                    />

                <InputField
                    label="비밀번호"
                    required
                    id="password"
                    min={6}
                    type="password"
                    message="*비밀번호는 필수 입력입니다."
                    placeholder="비밀번호를 입력해주세요."
                    register={register}
                    errors={errors}
                    />
            </div>

            <button
                disabled={loader}
                className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
                type="submit">
                {loader ? (
                    <>
                    <Spinners /> 로딩중..
                    </>
                ) : (
                    <>회원가입</>
                )}
            </button>

            <p className="text-center text-sm text-slate-700 mt-6">
              이미 계정이 있으신가요?
              <Link
                className="font-semibold underline hover:text-black"
                to="/login">
              <span> 로그인</span></Link>  
            </p>
            </form>
        </div>
    );
}

export default Register