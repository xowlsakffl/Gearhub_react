import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const CartEmpty = () => {
    return (
        <div className="bg-slate-50 font-notosans">
            <div className="mx-auto flex min-h-[calc(100vh-140px)] max-w-[720px] items-center justify-center px-4 py-12">
                <div className="w-full rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        <MdShoppingCart size={36} />
                    </div>
                    <h1 className="mt-6 text-3xl font-bold text-slate-900">장바구니가 비어 있습니다</h1>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        원하는 전자제품을 담아두고 주문을 이어가세요.
                    </p>

                    <div className="mt-8">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                            <MdArrowBack size={18} />
                            상품 보러 가기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartEmpty;
