import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import InputField from "../shared/InputField";
import Spinners from "../shared/Spinners";
import { authenticateSignInUser } from "../../store/actions";

const quickAccounts = [
    { label: "일반 계정", username: "demo", password: "password123!" },
    { label: "운영 계정", username: "admin", password: "admin1234!" },
];

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    };

    const applyQuickAccount = (account) => {
        setValue("username", account.username, { shouldValidate: true });
        setValue("password", account.password, { shouldValidate: true });
    };

    return (
        <div className="flex min-h-[calc(100vh-78px)] items-center justify-center bg-slate-50 px-4 py-12 font-notosans">
            <div className="w-full max-w-[560px] rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
                        <AiOutlineLogin className="text-3xl" />
                    </div>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Sign In
                    </p>
                    <h1 className="mt-3 text-3xl font-bold text-slate-900">로그인</h1>
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                        저장된 장바구니, 배송지, 주문 내역을 이어서 확인하세요.
                    </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {quickAccounts.map((account) => (
                        <button
                            key={account.label}
                            type="button"
                            onClick={() => applyQuickAccount(account)}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-slate-300 hover:bg-white"
                        >
                            <p className="text-sm font-semibold text-slate-900">{account.label}</p>
                            <p className="mt-2 text-sm text-slate-600">{account.username}</p>
                            <p className="mt-1 text-sm text-slate-500">{account.password}</p>
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit(loginHandler)} className="mt-8">
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
                            label="비밀번호"
                            required
                            id="password"
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
                                <Spinners /> 로그인 중...
                            </>
                        ) : (
                            <>로그인</>
                        )}
                    </button>

                    <p className="mt-6 text-center text-sm text-slate-700">
                        아직 계정이 없나요?
                        <Link className="ml-1 font-semibold underline hover:text-black" to="/register">
                            회원가입
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LogIn;
