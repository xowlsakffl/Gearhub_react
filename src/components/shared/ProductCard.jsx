import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
    productId,
    productName,
    image,
    description,
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
    const dispatch = useDispatch();

    const handleProductView = (product) => {
        if (!about) {
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1, toast))
    };

    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div
                onClick={() => {
                    handleProductView({
                        id: productId,
                        productName,
                        image,
                        description,
                        quantity,
                        price,
                        discount,
                        specialPrice,
                    });
                }}
                className="relative w-full overflow-hidden aspect-[3/2]"
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
                <img src={image} className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105" alt={productName}>
                </img>
            </div>
            <div className="p-4">
                <h2 onClick={() => {
                    handleProductView({
                        id: productId,
                        productName,
                        image,
                        description,
                        quantity,
                        price,
                        discount,
                        specialPrice,
                    });
                }} className="text-lg font-semibold mb-2 cursor-pointer">{truncateText(productName, 20)}</h2>

                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">{truncateText(description, 80)}</p>
                </div>
                
                {!about && (
                    <div className="flex items-center justify-between">
                        {specialPrice ? (
                        <div className="flex flex-col">
                            <span className="text-gray-400 line-through">
                                {new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(price)}
                            </span>
                            <span className="text-xl font-bold text-slate-700">
                                {new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(specialPrice)}
                            </span>
                        </div>
                        ) : (
                            <span className="text-xl font-bold text-slate-700">
                                {"  "}
                                {new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(price)}
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
                            className={`bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"}
                            text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-40 flex justify-center`}>
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
                isAvailable={isAvailable} />
        </div>
    );
};

export default ProductCard;
