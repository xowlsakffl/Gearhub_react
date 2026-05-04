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
    const btnLoader = false;
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

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div
                onClick={() => {
                    handleProductView({
                        id: productId,
                        productName,
                        image,
                        description,
                        categoryName: resolvedCategoryName,
                        quantity,
                        price,
                        discount,
                        specialPrice,
                    });
                }}
                className="relative w-full overflow-hidden aspect-[16/11] bg-slate-50"
            >
                <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
                    {discount > 0 ? (
                        <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
                            {discount}% 할인
                        </span>
                    ) : null}
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
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
            <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{resolvedCategoryName}</p>
                <h2
                    onClick={() => {
                        handleProductView({
                            id: productId,
                            productName,
                            image,
                            description,
                            categoryName: resolvedCategoryName,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                        });
                    }}
                    className="mb-2 mt-2 cursor-pointer text-lg font-semibold text-slate-900"
                >
                    {truncateText(productName, 24)}
                </h2>

                <div className="max-h-20 min-h-20">
                    <p className="text-sm text-slate-600">{truncateText(description, 84)}</p>
                </div>

                {!about && (
                    <div className="mt-4 gap-4 sm:flex-row sm:items-end sm:justify-between">
                        {specialPrice ? (
                            <div className="flex flex-col mb-2">
                                <span className="text-sm text-slate-400 line-through">
                                    {formatPrice(price)}
                                </span>
                                <span className="text-xl font-bold text-slate-900">
                                    {formatPrice(specialPrice)}
                                </span>
                            </div>
                        ) : (
                            <span className="text-xl font-bold text-slate-900">
                                {formatPrice(price)}
                            </span>
                        )}

                        <button
                            disabled={!isAvailable || btnLoader}
                            onClick={() => addToCartHandler({
                                image,
                                productName,
                                description,
                                specialPrice,
                                price,
                                productId,
                                quantity,
                            })}
                            className={`flex items-center justify-center rounded-md px-3 py-2 font-semibold text-white transition-colors duration-300 ${
                                isAvailable ? "bg-slate-900 hover:bg-slate-700" : "bg-slate-400"
                            }`}
                        >
                            <FaShoppingCart className="mr-2" />
                            {isAvailable ? "장바구니 추가" : "품절"}
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
