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
        <div className="min-h-[calc(100vh-70px)] bg-slate-50 px-4 py-12 font-notosans">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_420px]">
                <section className="rounded-2xl bg-white px-6 py-8 shadow-lg sm:px-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Join GearHub</p>
                    <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                        워크스페이스와 라이프스타일 기어를 위한 계정 만들기
                    </h1>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                        장바구니 저장, 배송지 관리, 주문 이력 확인까지 이어지는 기본 사용자 흐름을
                        모두 실험해 볼 수 있는 데모 스토어입니다.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {[
                            { title: "장바구니 유지", desc: "로그인 후 체크아웃 전환이 자연스럽게 이어집니다." },
                            { title: "배송지 관리", desc: "저장된 배송지를 선택해 주문에 연결합니다." },
                            { title: "주문 이력", desc: "테스트 주문 결과가 계정 화면에 쌓입니다." },
                        ].map((item) => (
                            <div key={item.title} className="rounded-xl bg-slate-50 p-4">
                                <p className="font-semibold text-slate-900">{item.title}</p>
                                <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <form
                    onSubmit={handleSubmit(registerHandler)}
                    className="rounded-2xl bg-white py-8 shadow-lg sm:px-8 px-4"
                >
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <FaUserPlus className="text-3xl text-slate-800" />
                        <h2 className="text-center text-2xl font-bold text-slate-800 sm:text-3xl">회원가입</h2>
                        <p className="text-sm text-slate-500">기본 계정을 만들고 로그인 흐름을 확인하세요.</p>
                    </div>

                    <hr className="mb-5 mt-4 text-black" />
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
                        className="my-3 flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700"
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
                        <Link className="font-semibold underline hover:text-black" to="/login">
                            <span> 로그인</span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
