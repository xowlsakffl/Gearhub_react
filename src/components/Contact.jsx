import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";

const contactItems = [
    { icon: <FaPhoneAlt className="text-slate-900" />, label: "대표 연락처", value: "+82 10-0000-0000" },
    { icon: <FaEnvelope className="text-slate-900" />, label: "이메일", value: "support@gearhub.local" },
    { icon: <FaMapMarkedAlt className="text-slate-900" />, label: "운영 위치", value: "서울, 대한민국" },
];

const Contact = () => {
    return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-50 font-notosans">
            <div className="mx-auto max-w-[1360px] px-4 py-10 sm:px-8 lg:px-10 xl:px-12">
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Customer Center</p>
                    <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">고객센터</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                        주문, 배송지, 결제 관련 정보를 빠르게 확인할 수 있도록 자주 찾는 안내만 정리했습니다.
                    </p>
                </section>

                <section className="mt-8 grid gap-6 lg:items-start lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

                    <div className="self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">자주 묻는 안내</h2>
                        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                            <p>1. 주문이 완료되면 계정 화면에서 주문 이력을 바로 확인할 수 있습니다.</p>
                            <p>2. 배송지는 체크아웃 화면에서 저장하고 다음 주문에도 이어서 사용할 수 있습니다.</p>
                            <p>3. 카드 결제와 간편결제는 선택한 수단에 따라 순서대로 이용할 수 있습니다.</p>
                            <p>4. 품절 상품은 장바구니 담기 버튼이 비활성화되어 바로 구분됩니다.</p>
                        </div>

                        <div className="mt-8 rounded-xl bg-slate-900 p-5 text-white">
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Shopping Guide</p>
                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                원하는 제품을 찾은 뒤 장바구니에 담고, 배송지와 결제 수단을 선택하면 주문이 완료됩니다.
                                완료된 주문은 마이페이지에서 다시 확인할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
