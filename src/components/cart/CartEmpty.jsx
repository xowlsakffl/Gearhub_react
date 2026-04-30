import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const CartEmpty = () => {
 return (
    <div className="min-h-[800px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
            <MdShoppingCart size={70} className="mb-4 text-slate-500"/>
            <div className="text-2xl font-bold text-slate-700">
                장바구니가 비었습니다.
            </div>
            <div className="text-sm text-slate-500 mt-2">
                시작하려면 상품을 추가해 주세요.
            </div>
        </div>
        <div className="mt-6">
            <Link
                to="/"
                className="flex gap-2 items-center text-blue-500 hover:text-blue-600 transition">
                    <MdArrowBack size={24} />
                    <span className="font-medium">쇼핑하기</span>
                </Link>
        </div>
    </div>
 )   
}

export default CartEmpty;