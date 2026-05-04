import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";

const contactItems = [
    { icon: <FaPhoneAlt className="text-slate-900" />, label: "대표 연락처", value: "+82 10-0000-0000" },
    { icon: <FaEnvelope className="text-slate-900" />, label: "이메일", value: "gearhub.demo@local.dev" },
    { icon: <FaMapMarkedAlt className="text-slate-900" />, label: "운영 위치", value: "Seoul, Republic of Korea" },
];

const Contact = () => {
    return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-50 font-notosans">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Contact</p>
                    <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">프로젝트 문의</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                        GearHub는 포트폴리오와 데모 검증을 목적으로 만든 프로젝트입니다.
                        구현 범위, 기술 선택, 확장 방향에 대해 논리적으로 이야기할 수 있도록 핵심 정보를 정리했습니다.
                    </p>
                </section>

                <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">연락 정보</h2>
                        <div className="mt-6 space-y-4">
                            {contactItems.map((item) => (
                                <div key={item.label} className="flex items-start gap-4 rounded-xl bg-slate-50 p-4">
                                    <div className="rounded-full bg-white p-3 shadow-sm">{item.icon}</div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                                        <p className="mt-1 text-sm text-slate-500">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">논의하기 좋은 주제</h2>
                        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                            <p>1. H2 기반 로컬 실행과 MySQL 운영 환경을 어떻게 분리할지</p>
                            <p>2. 관리자 상품 등록/이미지 업로드를 어떤 권한 체계로 확장할지</p>
                            <p>3. Stripe 외 PG 연동을 실제 서비스 수준으로 끌어올릴 방법</p>
                            <p>4. 주문 상태 변경, 취소, 환불 흐름을 추가할 때 필요한 데이터 모델</p>
                        </div>

                        <div className="mt-8 rounded-xl bg-slate-900 p-5 text-white">
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Next Step</p>
                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                현재 데모는 조회, 장바구니, 체크아웃, 주문 이력까지는 충분히 설명 가능합니다.
                                다음 단계는 관리자 기능과 실제 결제/주문 상태 전이를 붙이는 쪽이 맞습니다.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
