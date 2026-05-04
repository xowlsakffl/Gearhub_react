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
                        GearHub는 전자제품 중심 이커머스 데모를 목표로 만든 프로젝트입니다.
                        구현 범위와 확장 방향을 빠르게 이해할 수 있도록 핵심 정보만 남겼습니다.
                    </p>
                </section>

                <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">연락 정보</h2>
                        <div className="mt-6 divide-y divide-slate-100">
                            {contactItems.map((item) => (
                                <div key={item.label} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                                    <div className="rounded-full bg-slate-100 p-3">{item.icon}</div>
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
                            <p>1. 전자제품 전용 카테고리를 더 촘촘하게 나눌지, 브랜드 축을 추가할지</p>
                            <p>2. 관리자 상품 등록과 이미지 업로드를 어떤 권한 체계로 확장할지</p>
                            <p>3. 데모 결제를 실제 PG 연동으로 바꿀 때 필요한 결제/주문 상태 전이</p>
                            <p>4. 재고 부족, 취소, 환불 같은 후속 흐름을 어떻게 모델링할지</p>
                        </div>

                        <div className="mt-8 rounded-xl bg-slate-900 p-5 text-white">
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Next Step</p>
                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                지금 단계에서 가장 가치 큰 확장은 관리자 상품 운영 화면과 실제 결제 상태 전이입니다.
                                리뷰, 커뮤니티 같은 주변 기능보다 이쪽이 훨씬 설득력 있습니다.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
