import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import HeroBanner from "./HeroBanner";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { fetchCategories, fetchProducts } from "../../store/actions";
import { formatPrice } from "../../utils/formatPrice";

const getCategoryName = (product) =>
    product?.categoryName || product?.category?.categoryName || "기타";

const Home = () => {
    const dispatch = useDispatch();
    const { products, categories } = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const categorySummary = useMemo(() => {
        return (categories || []).slice(0, 4).map((category) => ({
            ...category,
            count: (products || []).filter((item) => getCategoryName(item) === category.categoryName).length,
        }));
    }, [categories, products]);

    const featuredProducts = useMemo(() => {
        const baseProducts = [...(products || [])];
        const categoryFiltered = selectedCategory === "all"
            ? baseProducts
            : baseProducts.filter((item) => getCategoryName(item) === selectedCategory);

        return categoryFiltered.sort((left, right) => {
            const discountGap = Number(right.discount || 0) - Number(left.discount || 0);
            if (discountGap !== 0) {
                return discountGap;
            }

            const stockGap = Number(right.quantity || 0) - Number(left.quantity || 0);
            if (stockGap !== 0) {
                return stockGap;
            }

            return Number(left.specialPrice || left.price || 0) - Number(right.specialPrice || right.price || 0);
        });
    }, [products, selectedCategory]);

    const spotlightProduct = featuredProducts[0];

    return (
        <div className="bg-slate-50 font-notosans">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:px-14">
                <HeroBanner />

                <section className="mt-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                                인기 카테고리
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                                카테고리로 바로 고르기
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                컴퓨팅, 오디오, 게이밍, 모바일 액세서리 중심으로 상품을 빠르게 좁힐 수 있습니다.
                            </p>
                        </div>

                        <Link
                            to="/products"
                            className="text-sm font-semibold text-slate-700 underline underline-offset-4"
                        >
                            전체 상품 보기
                        </Link>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => setSelectedCategory("all")}
                            className={`rounded-full border px-4 py-3 text-left text-sm font-semibold transition ${
                                selectedCategory === "all"
                                    ? "border-slate-900 bg-slate-900 text-white"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                            }`}
                        >
                            전체 상품
                            <span className={`ml-2 text-xs ${selectedCategory === "all" ? "text-slate-200" : "text-slate-400"}`}>
                                {(products || []).length}개
                            </span>
                        </button>

                        {categorySummary.map((category) => (
                            <button
                                key={category.categoryId}
                                type="button"
                                onClick={() => setSelectedCategory(category.categoryName)}
                                className={`rounded-full border px-4 py-3 text-left text-sm font-semibold transition ${
                                    selectedCategory === category.categoryName
                                        ? "border-slate-900 bg-slate-900 text-white"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                                }`}
                            >
                                {category.categoryName}
                                <span
                                    className={`ml-2 text-xs ${
                                        selectedCategory === category.categoryName ? "text-slate-200" : "text-slate-400"
                                    }`}
                                >
                                    {category.count}개
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="mt-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                                추천 상품
                            </p>
                            <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                {selectedCategory === "all" ? "지금 바로 보기 좋은 대표 상품" : `${selectedCategory} 추천 상품`}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                할인율과 재고 상태를 기준으로 먼저 보기 좋은 상품을 위로 정렬했습니다.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                            <span>카테고리 {categorySummary.length}개</span>
                            <span>할인 상품 중심</span>
                            <span>주문 이력 확인</span>
                        </div>
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : errorMessage ? (
                        <div className="mt-6 flex h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                            <FaExclamationTriangle className="mr-2 text-3xl text-slate-700" />
                            <span className="text-lg font-medium text-slate-800">{errorMessage}</span>
                        </div>
                    ) : (
                        <div className="mt-6 grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
                            <section className="rounded-2xl bg-slate-900 px-6 py-6 text-white">
                                {spotlightProduct ? (
                                    <>
                                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                            Spotlight Deal
                                        </p>
                                        <p className="mt-5 text-sm font-semibold text-slate-300">
                                            {getCategoryName(spotlightProduct)}
                                        </p>
                                        <h3 className="mt-2 text-2xl font-bold leading-tight">
                                            {spotlightProduct.productName}
                                        </h3>
                                        <p className="mt-4 text-sm leading-7 text-slate-300">
                                            {spotlightProduct.description}
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-3 text-sm">
                                            <span className="rounded-full border border-slate-600 px-3 py-2">
                                                할인 {spotlightProduct.discount || 0}%
                                            </span>
                                            <span className="rounded-full border border-slate-600 px-3 py-2">
                                                재고 {spotlightProduct.quantity || 0}개
                                            </span>
                                        </div>

                                        <div className="mt-8 flex items-end justify-between gap-4">
                                            <div>
                                                <p className="text-sm text-slate-400 line-through">
                                                    {formatPrice(spotlightProduct.price || 0)}
                                                </p>
                                                <p className="mt-1 text-3xl font-bold text-white">
                                                    {formatPrice(spotlightProduct.specialPrice || spotlightProduct.price || 0)}
                                                </p>
                                            </div>
                                            <Link
                                                to={`/products?category=${encodeURIComponent(getCategoryName(spotlightProduct))}`}
                                                className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                                            >
                                                카테고리 보기
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-slate-300">
                                        노출할 상품이 없습니다.
                                    </div>
                                )}
                            </section>

                            <div>
                                {featuredProducts.length ? (
                                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                        {featuredProducts.slice(0, 6).map((item) => (
                                            <ProductCard key={item.productId} {...item} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-500">
                                        선택한 카테고리에 등록된 상품이 없습니다.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Home;
