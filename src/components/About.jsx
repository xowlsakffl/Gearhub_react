import { Link } from "react-router-dom";

const About = () => {
    const points = [
        {
            title: "큐레이션 중심 구조",
            desc: "무작정 많은 상품을 보여주기보다 워크스페이스, 오디오, 게이밍, 모바일 기어처럼 사용 맥락이 분명한 카테고리로 정리했습니다.",
        },
        {
            title: "실행형 데모 데이터",
            desc: "상품, 배송지, 장바구니, 주문 이력까지 실제 흐름을 확인할 수 있도록 시드 데이터를 함께 구성했습니다.",
        },
        {
            title: "포트폴리오용 검증 흐름",
            desc: "로그인, 카트, 체크아웃, 테스트 주문, 주문 이력까지 화면과 API가 실제로 연결되어 있습니다.",
        },
    ];

    return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-50 font-notosans">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
                <section className="rounded-2xl bg-slate-900 px-6 py-8 text-white shadow-lg sm:px-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-300">About GearHub</p>
                    <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                        일과 취향을 연결하는 라이프스타일 기어 스토어
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                        GearHub는 단순히 상품을 나열하는 쇼핑몰이 아니라, 사용자가 어떤 상황에서 어떤 장비를 고를지까지
                        고려한 셀렉트 스토어를 목표로 구성한 포트폴리오 프로젝트입니다.
                    </p>
                </section>

                <section className="mt-8 grid gap-4 md:grid-cols-3">
                    {points.map((point) => (
                        <div key={point.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900">{point.title}</h2>
                            <p className="mt-3 text-sm leading-7 text-slate-500">{point.desc}</p>
                        </div>
                    ))}
                </section>

                <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">프로젝트 관점에서의 핵심 가치</h2>
                        <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                            <p>
                                이 프로젝트는 Spring Boot 백엔드와 React 프론트를 분리해 구성했고, 상품 조회, 인증,
                                장바구니, 배송지, 주문 생성, 주문 이력까지 기본 이커머스 흐름을 모두 연결했습니다.
                            </p>
                            <p>
                                특히 포트폴리오에서 자주 빠지는 부분인 주문 이후 화면까지 채워 넣어서, 단순 목록형 쇼핑몰이 아니라
                                실제 사용 흐름을 설명할 수 있는 데모로 정리했습니다.
                            </p>
                            <p>
                                현재는 테스트 주문과 데모 데이터를 중심으로 구성했기 때문에, 이후 실제 PG 연동과 관리자 상품 등록 기능을
                                추가하는 확장 여지도 남아 있습니다.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">바로 확인할 화면</h2>
                        <div className="mt-5 space-y-3 text-sm text-slate-600">
                            <p>1. 상품 목록에서 카테고리와 검색을 조합합니다.</p>
                            <p>2. 장바구니에서 상품 구성을 확인합니다.</p>
                            <p>3. 체크아웃에서 테스트 주문을 완료합니다.</p>
                            <p>4. 주문 이력 화면에서 후속 흐름을 검증합니다.</p>
                        </div>

                        <Link
                            to="/products"
                            className="mt-6 inline-flex rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
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
