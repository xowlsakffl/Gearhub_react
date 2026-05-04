import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import api from "../../api/api";
import Loader from "../shared/Loader";
import { formatPrice } from "../../utils/formatPrice";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        api.get("/orders/users")
            .then(({ data }) => {
                if (!active) {
                    return;
                }
                setOrders(data);
            })
            .catch((err) => {
                if (!active) {
                    return;
                }
                setError(err?.response?.data?.message || "주문 이력을 불러오지 못했습니다.");
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-slate-50">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-50 font-notosans">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">GearHub Orders</p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-900">주문 이력</h1>
                        <p className="mt-2 text-sm text-slate-500">
                            테스트 주문을 포함해 계정에 쌓인 모든 주문 흐름을 확인할 수 있습니다.
                        </p>
                    </div>
                    <Link
                        to="/products"
                        className="rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                        상품 다시 보기
                    </Link>
                </div>

                {error ? (
                    <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}

                {!error && !orders.length ? (
                    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                        <FaBoxOpen className="mx-auto text-3xl text-slate-400" />
                        <h2 className="mt-4 text-xl font-bold text-slate-900">아직 주문 이력이 없습니다</h2>
                        <p className="mt-2 text-sm text-slate-500">
                            장바구니에서 체크아웃으로 이동해 테스트 주문을 완료하면 이 화면에 이력이 쌓입니다.
                        </p>
                    </div>
                ) : null}

                <div className="mt-8 space-y-5">
                    {orders.map((order) => (
                        <article
                            key={order.orderId}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        Order #{order.orderId}
                                    </p>
                                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                                        {order.orderDate} 주문
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        결제 수단: {order.payment?.paymentMethod || "-"} · PG: {order.payment?.pgName || "-"}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3 sm:justify-end">
                                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                                        {order.orderStatus}
                                    </span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                        총 {formatPrice(order.totalAmount || 0)}
                                    </span>
                                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                        상품 {order.orderItems?.length || 0}건
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {order.orderItems?.map((item) => (
                                    <div key={item.orderItemId} className="rounded-xl border border-slate-200 p-4">
                                        <div className="flex gap-4">
                                            <img
                                                src={item.product?.image}
                                                alt={item.product?.productName}
                                                className="h-20 w-20 rounded-lg object-cover"
                                            />
                                            <div className="min-w-0">
                                                <p className="font-semibold text-slate-900">{item.product?.productName}</p>
                                                <p className="mt-1 text-sm text-slate-500">{item.product?.description}</p>
                                                <p className="mt-3 text-sm text-slate-600">
                                                    {item.quantity}개 · {formatPrice(item.orderedProductPrice || 0)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
