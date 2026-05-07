import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaBoxOpen, FaExclamationTriangle, FaShoppingCart, FaTruck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import api from "../../api/api";
import Loader from "../shared/Loader";
import ProductCard from "../shared/ProductCard";
import { formatPrice } from "../../utils/formatPrice";
import { addToCart } from "../../store/actions";

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        let ignore = false;
        window.scrollTo(0, 0);

        const loadProduct = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const { data } = await api.get(`/public/products/${productId}`);
                if (ignore) {
                    return;
                }

                setProduct(data);
                setSelectedQuantity(1);

                try {
                    const relatedResponse = await api.get("/public/products", {
                        params: {
                            category: data.categoryName,
                            pageSize: 6,
                            sortBy: "specialPrice",
                            sortOrder: "asc",
                        },
                    });

                    if (ignore) {
                        return;
                    }

                    setRelatedProducts(
                        (relatedResponse.data?.content || [])
                            .filter((item) => item.productId !== data.productId)
                            .slice(0, 4)
                    );
                } catch (relatedError) {
                    console.error("Failed to load related products", relatedError);
                    if (!ignore) {
                        setRelatedProducts([]);
                    }
                }
            } catch (error) {
                if (!ignore) {
                    setErrorMessage(
                        error?.response?.data?.message || "상품 상세 정보를 불러오지 못했습니다."
                    );
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        };

        loadProduct();

        return () => {
            ignore = true;
        };
    }, [productId]);

    const specItems = useMemo(
        () =>
            (product?.summarySpecs || "")
                .split("|")
                .map((item) => item.trim())
                .filter(Boolean),
        [product?.summarySpecs]
    );

    const isAvailable = Number(product?.quantity || 0) > 0;

    const handleAddToCart = () => {
        if (!product) {
            return;
        }

        dispatch(
            addToCart(
                {
                    ...product,
                    availableQuantity: product.quantity,
                },
                selectedQuantity,
                toast
            )
        );
    };

    if (isLoading) {
        return <Loader />;
    }

    if (errorMessage || !product) {
        return (
            <div className="bg-slate-50 font-notosans">
                <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-10 xl:px-12">
                    <div className="flex min-h-[360px] items-center justify-center rounded-[28px] border border-slate-200 bg-white shadow-sm">
                        <div className="text-center">
                            <FaExclamationTriangle className="mx-auto text-4xl text-slate-700" />
                            <p className="mt-4 text-lg font-semibold text-slate-900">
                                {errorMessage || "상품을 찾을 수 없습니다."}
                            </p>
                            <Link
                                to="/products"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                            >
                                <FaArrowLeft size={14} />
                                상품 목록으로 돌아가기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 font-notosans">
            <div className="mx-auto max-w-[1520px] px-4 py-10 sm:px-8 lg:px-10 xl:px-12">
                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <Link to="/" className="hover:text-slate-900">홈</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-slate-900">스토어</Link>
                    <span>/</span>
                    <span>{product.categoryName}</span>
                </div>

                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
                        <div className="overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#f8fafc,#e2e8f0)] p-6">
                            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#ffffff,#dbeafe)] p-8">
                                <img
                                    src={product.image}
                                    alt={product.productName}
                                    className="h-full w-full object-contain object-center drop-shadow-[0_24px_40px_rgba(15,23,42,0.18)]"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    {product.categoryName}
                                </span>
                                {product.brand ? (
                                    <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                                        {product.brand}
                                    </span>
                                ) : null}
                                {product.discount > 0 ? (
                                    <span className="rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                                        {product.discount}% 할인
                                    </span>
                                ) : null}
                            </div>

                            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-[2.3rem]">
                                {product.productName}
                            </h1>
                            <p className="mt-4 max-w-[64ch] text-sm leading-7 text-slate-600">
                                {product.description}
                            </p>

                            <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                                <div className="flex flex-wrap items-end justify-between gap-4">
                                    <div>
                                        {product.discount > 0 ? (
                                            <span className="text-base text-slate-400 line-through">
                                                {formatPrice(product.price)}
                                            </span>
                                        ) : null}
                                        <div className="mt-1 text-3xl font-bold text-slate-900">
                                            {formatPrice(product.specialPrice || product.price)}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <span className={`rounded-full px-3 py-2 text-xs font-semibold ${isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                                            {isAvailable ? `재고 ${product.quantity}개` : "품절"}
                                        </span>
                                        <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-500">
                                            빠른 출고 상품
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-2">
                                        <button
                                            type="button"
                                            disabled={selectedQuantity <= 1}
                                            onClick={() => setSelectedQuantity((prev) => Math.max(1, prev - 1))}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            -
                                        </button>
                                        <span className="min-w-[28px] text-center text-sm font-semibold text-slate-900">
                                            {selectedQuantity}
                                        </span>
                                        <button
                                            type="button"
                                            disabled={!isAvailable || selectedQuantity >= Number(product.quantity || 0)}
                                            onClick={() => setSelectedQuantity((prev) => prev + 1)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        disabled={!isAvailable}
                                        onClick={handleAddToCart}
                                        className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white transition ${
                                            isAvailable ? "bg-slate-900 hover:bg-slate-700" : "bg-slate-400"
                                        }`}
                                    >
                                        <FaShoppingCart />
                                        장바구니 담기
                                    </button>

                                    <Link
                                        to="/products"
                                        className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        다른 상품 보기
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 lg:grid-cols-2">
                                <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-slate-100 p-3 text-slate-700">
                                            <FaBoxOpen />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">핵심 스펙</p>
                                            <p className="text-sm text-slate-500">구매 전에 바로 확인할 수 있는 주요 정보</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {specItems.length ? specItems.map((spec) => (
                                            <span
                                                key={spec}
                                                className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600"
                                            >
                                                {spec}
                                            </span>
                                        )) : (
                                            <span className="text-sm text-slate-500">등록된 스펙 정보가 없습니다.</span>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-slate-100 p-3 text-slate-700">
                                            <FaTruck />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">배송 안내</p>
                                            <p className="text-sm text-slate-500">주문 후 출고 기준과 기본 배송 정보</p>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm leading-7 text-slate-600">
                                        {product.shippingInfo || "평일 주문 건은 순차 출고되며, 배송지와 결제 완료 시점에 따라 변동될 수 있습니다."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                                함께 보면 좋은 상품
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                같은 카테고리 추천 상품
                            </h2>
                        </div>
                    </div>

                    {relatedProducts.length ? (
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                            {relatedProducts.map((item) => (
                                <ProductCard key={item.productId} {...item} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-sm text-slate-500">
                            같은 카테고리의 다른 상품을 준비 중입니다.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ProductDetail;
