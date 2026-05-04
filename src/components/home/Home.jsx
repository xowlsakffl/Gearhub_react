import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import HeroBanner from "./HeroBanner";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { fetchCategories, fetchProducts } from "../../store/actions";

const Home = () => {
    const dispatch = useDispatch();
    const { products, categories } = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="bg-slate-50 font-notosans">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:px-14">
                <HeroBanner />

                <section className="mt-8 grid gap-4 md:grid-cols-3">
                    {[
                        { title: "데모 주문 플로우", desc: "로그인부터 장바구니, 체크아웃, 주문 이력까지 한 번에 검증할 수 있습니다." },
                        { title: "카테고리 기반 탐색", desc: "워크스페이스, 오디오, 게이밍, 모바일 기준으로 상품을 빠르게 좁힐 수 있습니다." },
                        { title: "실행형 포트폴리오", desc: "Spring Boot API와 React 프론트가 실제로 연결된 상태로 동작합니다." },
                    ].map((item) => (
                        <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-500">{item.desc}</p>
                        </div>
                    ))}
                </section>

                <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Quick Categories</p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-900">카테고리 바로 이동</h2>
                        </div>
                        <Link to="/products" className="text-sm font-semibold text-slate-700 underline">
                            전체 스토어 보기
                        </Link>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {(categories || []).slice(0, 4).map((category) => (
                            <Link
                                key={category.categoryId}
                                to={`/products?category=${encodeURIComponent(category.categoryName)}`}
                                className="rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100"
                            >
                                <p className="text-sm font-semibold text-slate-900">{category.categoryName}</p>
                                <p className="mt-2 text-sm text-slate-500">해당 카테고리 상품만 모아 볼 수 있습니다.</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mt-10">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Featured Products</p>
                            <h2 className="mt-2 text-3xl font-bold text-slate-900">지금 바로 보기 좋은 추천 상품</h2>
                            <p className="mt-2 text-sm text-slate-500">
                                데모 계정 장바구니와 연결되는 대표 상품만 먼저 노출합니다.
                            </p>
                        </div>
                        <Link
                            to="/products"
                            className="rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                            전체 상품 보기
                        </Link>
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : errorMessage ? (
                        <div className="flex h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                            <FaExclamationTriangle className="mr-2 text-3xl text-slate-700" />
                            <span className="text-lg font-medium text-slate-800">{errorMessage}</span>
                        </div>
                    ) : (
                        <div className="grid gap-6 pb-6 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products?.slice(0, 8).map((item) => (
                                <ProductCard key={item.productId} {...item} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Home;
