import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import InputField from "../shared/InputField";
import Spinners from "../shared/Spinners";
import { registerNewUser } from "../../store/actions";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className="flex min-h-[calc(100vh-78px)] items-center justify-center bg-slate-50 px-4 py-12 font-notosans">
            <div className="w-full max-w-[560px] rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
                        <FaUserPlus className="text-2xl" />
                    </div>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Create Account
                    </p>
                    <h1 className="mt-3 text-3xl font-bold text-slate-900">회원가입</h1>
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                        계정을 만들면 장바구니, 배송지, 주문 내역을 한 번에 관리할 수 있습니다.
                    </p>
                </div>

                <div className="mt-8 grid gap-2">
                    {[
                        "장바구니 상품을 바로 이어서 확인",
                        "배송지 정보를 저장하고 빠르게 주문",
                        "주문 내역과 결제 흐름을 한 화면에서 관리",
                    ].map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit(registerHandler)} className="mt-8">
                    <div className="flex flex-col gap-3">
                        <InputField
                            label="아이디"
                            required
                            id="username"
                            type="text"
                            message="아이디는 필수 입력입니다."
                            placeholder="아이디를 입력해 주세요."
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            label="이메일"
                            required
                            id="email"
                            type="email"
                            message="이메일은 필수 입력입니다."
                            placeholder="이메일을 입력해 주세요."
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            label="비밀번호"
                            required
                            id="password"
                            min={6}
                            type="password"
                            message="비밀번호는 필수 입력입니다."
                            placeholder="비밀번호를 입력해 주세요."
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <button
                        disabled={loader}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700"
                        type="submit"
                    >
                        {loader ? (
                            <>
                                <Spinners /> 처리 중...
                            </>
                        ) : (
                            <>회원가입</>
                        )}
                    </button>

                    <p className="mt-6 text-center text-sm text-slate-700">
                        이미 계정이 있나요?
                        <Link className="ml-1 font-semibold underline hover:text-black" to="/login">
                            로그인
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
