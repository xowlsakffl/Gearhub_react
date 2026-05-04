import { MdArrowBack, MdLocalShipping, MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";

const Cart = () => {
    const { cart } = useSelector((state) => state.carts);

    if (!cart || cart.length === 0) {
        return <CartEmpty />;
    }

    const totalPrice = cart.reduce(
        (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity),
        0
    );
    const totalCount = cart.reduce((acc, cur) => acc + Number(cur?.quantity || 0), 0);

    return (
        <div className="bg-slate-50 font-notosans">
            <div className="mx-auto max-w-[1520px] px-4 py-10 sm:px-8 lg:px-10 xl:px-12">
                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                                <MdShoppingCart size={18} />
                                장바구니
                            </div>
                            <h1 className="mt-4 text-3xl font-bold text-slate-900">주문 전 상품 확인</h1>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                담아둔 상품 수량과 금액을 확인한 뒤 결제를 진행하세요.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                            <span className="rounded-full bg-slate-100 px-3 py-2">상품 {cart.length}종</span>
                            <span className="rounded-full bg-slate-100 px-3 py-2">총 수량 {totalCount}개</span>
                            <span className="rounded-full bg-slate-100 px-3 py-2">빠른 배송 가능</span>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-8 xl:grid-cols-[1.45fr_0.55fr]">
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <ItemContent key={item.productId} {...item} />
                            ))}
                        </div>

                        <aside className="h-fit rounded-[24px] border border-slate-200 bg-slate-50 p-6 xl:sticky xl:top-[110px]">
                            <h2 className="text-xl font-bold text-slate-900">주문 요약</h2>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between text-sm text-slate-500">
                                    <span>상품 금액</span>
                                    <span className="font-semibold text-slate-700">{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-slate-500">
                                    <span>배송비</span>
                                    <span className="font-semibold text-slate-700">결제 단계에서 계산</span>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full bg-emerald-100 p-2 text-emerald-700">
                                            <MdLocalShipping size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">빠른 배송 안내</p>
                                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                                결제 완료 후 배송지와 결제 수단을 최종 확인합니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-slate-200 pt-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-slate-500">총 결제 예정 금액</span>
                                    <span className="text-2xl font-bold text-slate-900">{formatPrice(totalPrice)}</span>
                                </div>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    세금 및 배송비는 결제 단계에서 최종 반영됩니다.
                                </p>
                            </div>

                            <div className="mt-6 space-y-3">
                                <Link
                                    to="/checkout"
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                                >
                                    주문 진행하기
                                </Link>
                                <Link
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                                    to="/products"
                                >
                                    <MdArrowBack />
                                    쇼핑 계속하기
                                </Link>
                            </div>
                        </aside>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Cart;
