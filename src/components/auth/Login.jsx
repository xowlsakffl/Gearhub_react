import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import InputField from "../shared/InputField";
import Spinners from "../shared/Spinners";
import { authenticateSignInUser } from "../../store/actions";

const demoAccounts = [
    { label: "구매자 데모", username: "demo", password: "password123!" },
    { label: "관리자 데모", username: "admin", password: "admin1234!" },
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

    const applyDemoAccount = (account) => {
        setValue("username", account.username, { shouldValidate: true });
        setValue("password", account.password, { shouldValidate: true });
    };

    return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-50 px-4 py-12 font-notosans">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_420px]">
                <section className="rounded-2xl bg-slate-900 px-6 py-8 text-white shadow-lg sm:px-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-300">GearHub Demo Access</p>
                    <h1 className="mt-4 text-3xl font-bold sm:text-4xl">실행형 이커머스 포트폴리오에 바로 로그인</h1>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                        장바구니, 체크아웃, 테스트 주문, 주문 이력까지 연결된 상태로 확인할 수 있게
                        데모 계정을 함께 제공합니다.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {demoAccounts.map((account) => (
                            <button
                                key={account.label}
                                type="button"
                                onClick={() => applyDemoAccount(account)}
                                className="rounded-xl border border-slate-700 bg-slate-800/70 p-4 text-left transition hover:border-slate-500 hover:bg-slate-800"
                            >
                                <p className="font-semibold text-white">{account.label}</p>
                                <p className="mt-2 text-sm text-slate-300">{account.username}</p>
                                <p className="mt-1 text-sm text-slate-400">{account.password}</p>
                            </button>
                        ))}
                    </div>
                </section>

                <form
                    onSubmit={handleSubmit(loginHandler)}
                    className="rounded-2xl bg-white py-8 shadow-lg sm:px-8 px-4"
                >
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <AiOutlineLogin className="text-3xl text-slate-800" />
                        <h2 className="text-center text-2xl font-bold text-slate-800 sm:text-3xl">로그인</h2>
                        <p className="text-sm text-slate-500">GearHub 계정으로 주문 흐름을 확인하세요.</p>
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
                        className="my-3 flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700"
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
                        <Link className="font-semibold underline hover:text-black" to="/register">
                            <span> 회원가입</span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LogIn;
