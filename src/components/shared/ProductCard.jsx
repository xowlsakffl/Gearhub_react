import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import truncateText from "../../utils/truncateText";
import { addToCart } from "../../store/actions";
import { formatPrice } from "../../utils/formatPrice";

const ProductCard = ({
    productId,
    productName,
    image,
    description,
    category,
    categoryName,
    quantity,
    price,
    discount,
    specialPrice,
    brand,
    summarySpecs,
    shippingInfo,
    about = false,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAvailable = Number(quantity || 0) > 0;
    const resolvedCategoryName = categoryName || category?.categoryName || "전자기기";

    const moveToDetail = () => {
        if (about) {
            return;
        }
        navigate(`/products/${productId}`);
    };

    const handleCardKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            moveToDetail();
        }
    };

    const addToCartHandler = (event) => {
        event.stopPropagation();
        dispatch(
            addToCart(
                {
                    productId,
                    productName,
                    image,
                    description,
                    categoryName: resolvedCategoryName,
                    price,
                    discount,
                    specialPrice,
                    quantity,
                    availableQuantity: quantity,
                    brand,
                    summarySpecs,
                    shippingInfo,
                },
                1,
                toast
            )
        );
    };

    return (
        <div
            role={about ? undefined : "link"}
            tabIndex={about ? -1 : 0}
            onClick={moveToDetail}
            onKeyDown={handleCardKeyDown}
            className={`group flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                about ? "" : "cursor-pointer"
            }`}
        >
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-[linear-gradient(180deg,#f8fafc,#eef2ff)]">
                <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
                    {discount > 0 ? (
                        <span className="rounded-md bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white">
                            {discount}% 할인
                        </span>
                    ) : null}
                    <span
                        className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                            isAvailable ? "bg-emerald-600 text-white" : "bg-slate-700 text-white"
                        }`}
                    >
                        {isAvailable ? `재고 ${quantity}개` : "품절"}
                    </span>
                </div>
                <img
                    src={image}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    alt={productName}
                />
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {resolvedCategoryName}
                    </p>
                    {brand ? (
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500">
                            {brand}
                        </span>
                    ) : null}
                </div>

                <h2 className="mb-2 mt-2 min-h-[56px] text-[1.05rem] font-semibold leading-7 text-slate-900 transition group-hover:text-slate-700">
                    {truncateText(productName, 24)}
                </h2>

                <div className="min-h-[84px]">
                    <p className="text-sm leading-6 text-slate-600">{truncateText(description, 84)}</p>
                </div>

                {!about && (
                    <div className="mt-auto border-t border-slate-100 pt-4">
                        <div className="flex items-end justify-between gap-3">
                            {specialPrice ? (
                                <div className="flex flex-col">
                                    <span className="text-sm text-slate-400 line-through">
                                        {formatPrice(price)}
                                    </span>
                                    <span className="text-xl font-bold text-slate-900">
                                        {formatPrice(specialPrice)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-xl font-bold text-slate-900">{formatPrice(price)}</span>
                            )}

                            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                                {isAvailable ? "즉시 구매 가능" : "현재 품절"}
                            </span>
                        </div>

                        <div className="mt-3 flex justify-end">
                            <button
                                type="button"
                                aria-label="장바구니 담기"
                                disabled={!isAvailable}
                                onClick={addToCartHandler}
                                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold text-white transition-colors duration-300 ${
                                    isAvailable ? "bg-slate-900 hover:bg-slate-700" : "bg-slate-400"
                                }`}
                            >
                                <FaShoppingCart />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
