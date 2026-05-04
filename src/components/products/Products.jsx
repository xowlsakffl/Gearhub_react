import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Pagination";

const Products = () => {
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { products, categories, pagination } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="bg-slate-50 font-notosans">
            <div className="mx-auto max-w-[1560px] px-4 py-12 sm:px-8 lg:px-10 xl:px-12">
                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                                전자제품 스토어
                            </p>
                            <h1 className="mt-2 text-3xl font-bold text-slate-900">
                                원하는 전자제품을 바로 고르기
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                검색과 카테고리 필터로 필요한 제품만 빠르게 골라볼 수 있습니다.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                            <span className="rounded-full bg-slate-100 px-3 py-2">총 상품 {pagination?.totalElements || 0}개</span>
                            <span className="rounded-full bg-slate-100 px-3 py-2">카테고리 {categories?.length || 0}개</span>
                            <span className="rounded-full bg-slate-100 px-3 py-2">할인 상품 우선 노출</span>
                        </div>
                    </div>

                    <Filter categories={categories || []} />

                    {isLoading ? (
                        <Loader />
                    ) : errorMessage ? (
                        <div className="mt-6 flex h-[200px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                            <FaExclamationTriangle className="mr-2 text-3xl text-slate-800" />
                            <span className="text-lg font-medium text-slate-800">{errorMessage}</span>
                        </div>
                    ) : (
                        <div className="min-h-[700px]">
                            <div className="grid gap-6 pb-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                                {products &&
                                    products.map((item) => <ProductCard key={item.productId} {...item} />)}
                            </div>

                            <div className="flex justify-center pt-8">
                                <Paginations
                                    numberOfPage={pagination?.totalPages}
                                    totalProducts={pagination?.totalElements}
                                />
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Products;
