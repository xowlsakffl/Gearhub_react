import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../store/actions";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";
import truncateText from "../../utils/truncateText";

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    specialPrice,
}) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const dispatch = useDispatch();

    const handleQtyIncrease = (cartItems) => {
        dispatch(increaseCartQuantity(cartItems, toast, currentQuantity, setCurrentQuantity));
    };

    const handleQtyDecrease = (cartItems) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(decreaseCartQuantity(cartItems, newQuantity));
        }
    };

    const removeItemFromCart = (cartItems) => {
        dispatch(removeFromCart(cartItems, toast));
    };

    return (
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-1 gap-4">
                    <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#f8fafc,#eef2ff)] p-3">
                        <img
                            src={image}
                            alt={productName}
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                장바구니 상품
                            </p>
                            <h3 className="mt-2 text-lg font-semibold text-slate-900">
                                {truncateText(productName, 40)}
                            </h3>
                            <p className="mt-2 max-w-[56ch] text-sm leading-6 text-slate-500">
                                {truncateText(description, 120)}
                            </p>
                        </div>

                        <button
                            onClick={() => removeItemFromCart({
                                image,
                                productName,
                                description,
                                specialPrice,
                                price,
                                productId,
                                quantity,
                            })}
                            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
                        >
                            <HiOutlineTrash size={16} />
                            삭제
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3 lg:min-w-[460px] lg:bg-white lg:p-0 lg:border-0">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">판매가</p>
                        <div className="mt-2 text-lg font-semibold text-slate-900">
                            {formatPrice(Number(specialPrice))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">수량</p>
                        <div className="mt-2">
                            <SetQuantity
                                quantity={currentQuantity}
                                cardCounter
                                handeQtyIncrease={() => handleQtyIncrease({
                                    image,
                                    productName,
                                    description,
                                    specialPrice,
                                    price,
                                    productId,
                                    quantity,
                                })}
                                handleQtyDecrease={() => handleQtyDecrease({
                                    image,
                                    productName,
                                    description,
                                    specialPrice,
                                    price,
                                    productId,
                                    quantity,
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">합계</p>
                        <div className="mt-2 text-lg font-semibold text-slate-900">
                            {formatPrice(Number(currentQuantity) * Number(specialPrice))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemContent;
