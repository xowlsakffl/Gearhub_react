import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";
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
    about = false,
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const resolvedCategoryName = categoryName || category?.categoryName || "전자기기";
    const dispatch = useDispatch();

    const handleProductView = (product) => {
        if (!about) {
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1, toast));
    };

    const productPayload = {
        id: productId,
        productName,
        image,
        description,
        categoryName: resolvedCategoryName,
        quantity,
        price,
        discount,
        specialPrice,
    };

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div
                onClick={() => handleProductView(productPayload)}
                className="relative aspect-[16/11] w-full overflow-hidden bg-[linear-gradient(180deg,#f8fafc,#eef2ff)]"
            >
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
                    className="h-full w-full cursor-pointer object-contain p-4 transition-transform duration-300 hover:scale-105"
                    alt={productName}
                />
            </div>

            <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {resolvedCategoryName}
                </p>
                <h2
                    onClick={() => handleProductView(productPayload)}
                    className="mb-2 mt-2 min-h-[56px] cursor-pointer text-[1.05rem] font-semibold leading-7 text-slate-900"
                >
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

                        <button
                            disabled={!isAvailable}
                            onClick={() =>
                                addToCartHandler({
                                    image,
                                    productName,
                                    description,
                                    specialPrice,
                                    price,
                                    productId,
                                    quantity,
                                })
                            }
                            className={`mt-3 flex w-full items-center justify-center rounded-xl px-3 py-2.5 font-semibold text-white transition-colors duration-300 ${
                                isAvailable ? "bg-slate-900 hover:bg-slate-700" : "bg-slate-400"
                            }`}
                        >
                            <FaShoppingCart className="mr-2" />
                            {isAvailable ? "장바구니 담기" : "품절"}
                        </button>
                    </div>
                )}
            </div>

            <ProductViewModal
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    );
};

export default ProductCard;
