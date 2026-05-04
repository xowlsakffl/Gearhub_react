import { Link } from "react-router-dom";

const About = () => {
    const points = [
        "컴퓨팅, 오디오, 게이밍, 모바일 액세서리 중심으로 카테고리를 제한해 전자제품 전문몰 톤을 분명하게 잡았습니다.",
        "상품 조회, 인증, 장바구니, 배송지, 테스트 주문, 주문 이력까지 실제 이커머스 흐름이 모두 연결되어 있습니다.",
        "로컬에서 바로 실행할 수 있도록 데모 계정과 시드 데이터를 포함해 화면 확인이 끊기지 않게 구성했습니다.",
    ];

    return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-50 font-notosans">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
                <section className="rounded-2xl bg-slate-900 px-6 py-8 text-white shadow-lg sm:px-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-300">About GearHub</p>
                    <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                        전자제품 중심으로 재정리한 디지털 셀렉트 스토어
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                        GearHub는 범용 쇼핑몰처럼 모든 품목을 다루지 않습니다. 전자제품과 디지털 액세서리에만 범위를 좁혀서,
                        홈 화면부터 카테고리 구조, 데모 데이터, 주문 흐름까지 한 방향으로 맞춘 포트폴리오 프로젝트입니다.
                    </p>
                </section>

                <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">프로젝트 핵심</h2>
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
                        <h2 className="text-2xl font-bold text-slate-900">확인 포인트</h2>
                        <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                            <p>1. 홈에서 카테고리별 대표 상품과 할인 우선 정렬을 확인합니다.</p>
                            <p>2. 스토어에서 검색, 카테고리, 가격 정렬을 조합합니다.</p>
                            <p>3. 장바구니와 체크아웃에서 주문 플로우를 끝까지 진행합니다.</p>
                            <p>4. 주문 이력에서 테스트 주문 결과와 상품 구성을 검증합니다.</p>
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
