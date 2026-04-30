import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const newCart = { ...cart };

    newCart.totalPrice = cart?.reduce(
        (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity), 0
    );

    if(!cart || cart.length === 0){
        return <CartEmpty />;
    }

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-10 font-notosans">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <MdShoppingCart size={28} className="text-gray-700" />
                    장바구니
                </h1>
            </div>

            <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
                <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
                    제품
                </div>

                <div className="justify-self-center text-lg text-slate-800">
                    가격
                </div>

                <div className="justify-self-center text-lg text-slate-800">
                    수량
                </div>

                <div className="justify-self-center text-lg text-slate-800">
                    합계
                </div>
            </div>

            <div>
                {cart && cart.length > 0 && 
                    cart.map((item, i) => <ItemContent key={item.productId} {...item} />)}
            </div>

            <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
                <div></div>
                <div className="flex text-sm gap-1 flex-col">
                    <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
                        <span>총 결제 금액</span>
                        <span>{formatPrice(newCart?.totalPrice)}</span>
                    </div>

                    <p className="text-slate-500">
                        세금 및 배송비는 결제 시 계산됩니다.
                    </p>

                    <Link className="w-full flex justify-end" to="/checkout">
                    <button
                        onClick={() => {}}
                        className="font-semibold w-[300px] py-2 px-4 rounded-sm bg-customBlue text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duration-500">
                        <MdShoppingCart size={18} />
                        주문하기
                    </button>
                    </Link>

                    <Link className="flex gap-2 items-center mt-2 text-slate-500" to="/products">
                        <MdArrowBack />
                        <span>쇼핑 계속하기</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;