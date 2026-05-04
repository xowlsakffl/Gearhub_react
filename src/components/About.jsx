import { Link } from "react-router-dom";

const About = () => {
    const points = [
        "컴퓨팅, 오디오, 게이밍, 모바일 액세서리 중심으로 자주 찾는 전자제품만 선별했습니다.",
        "가격과 할인 폭, 재고 상태를 한눈에 비교할 수 있게 상품 노출 방식을 단순하게 정리했습니다.",
        "장바구니, 배송지, 주문 이력까지 구매에 필요한 기본 흐름을 한 곳에서 이어서 사용할 수 있습니다.",
    ];

    return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-50 font-notosans">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
                <section className="rounded-2xl bg-slate-900 px-6 py-8 text-white shadow-lg sm:px-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-300">About GearHub</p>
                    <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                        일상에서 자주 쓰는 전자제품을 더 간결하게 고르는 방법
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                        GearHub는 제품 수만 늘리는 대신, 자주 비교하게 되는 전자제품과 주변기기에 집중합니다.
                        복잡한 소개보다 바로 고르고 바로 주문할 수 있는 흐름을 우선으로 구성했습니다.
                    </p>
                </section>

                <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">브랜드 기준</h2>
                        <div className="mt-6 space-y-5">
                            {points.map((point, index) => (
                                <div key={point} className="border-b border-slate-100 pb-5 last:border-none last:pb-0">
                                    <p className="text-xs font-bold tracking-[0.25em] text-slate-400">0{index + 1}</p>
                                    <p className="mt-2 text-sm leading-7 text-slate-600">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">자주 찾는 화면</h2>
                        <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                            <p>1. 홈에서 카테고리별 대표 상품을 빠르게 둘러봅니다.</p>
                            <p>2. 스토어에서 검색과 카테고리 필터로 원하는 제품을 좁힙니다.</p>
                            <p>3. 장바구니와 결제 화면에서 주문 내용을 확인합니다.</p>
                            <p>4. 주문 이력에서 이전 구매 내역을 다시 확인합니다.</p>
                        </div>

                        <Link
                            to="/products"
                            className="mt-8 inline-flex rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                            스토어 바로 가기
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
