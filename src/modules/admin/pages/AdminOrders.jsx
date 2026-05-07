import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { IoRefreshOutline, IoSearchOutline } from "react-icons/io5";
import api from "../../../api/api";
import { formatPrice } from "../../../utils/formatPrice";

const orderStatuses = [
    "주문 접수",
    "결제 완료",
    "상품 준비중",
    "배송중",
    "배송 완료",
    "주문 취소",
];

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/admin/orders");
            setOrders(data || []);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "주문 정보를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const filteredOrders = useMemo(() => {
        const value = keyword.trim().toLowerCase();
        if (!value) {
            return orders;
        }

        return orders.filter((order) => {
            const products = (order.orderItems || [])
                .map((item) => item.product?.productName)
                .join(" ");
            const target = [
                order.orderId,
                order.email,
                order.orderStatus,
                order.orderDate,
                products,
            ].join(" ").toLowerCase();
            return target.includes(value);
        });
    }, [keyword, orders]);

    const totalRevenue = useMemo(
        () => filteredOrders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0),
        [filteredOrders]
    );

    const handleStatusChange = async (orderId, orderStatus) => {
        try {
            setUpdatingOrderId(orderId);
            const { data } = await api.put(`/admin/orders/${orderId}/status`, { orderStatus });
            setOrders((prev) => prev.map((order) => order.orderId === orderId ? data : order));
            toast.success("주문 상태를 변경했습니다.");
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "주문 상태 변경에 실패했습니다.");
        } finally {
            setUpdatingOrderId(null);
        }
    };

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-bold text-slate-500">조회 주문</p>
                    <p className="mt-2 text-3xl font-black text-slate-950">{filteredOrders.length.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-bold text-slate-500">조회 매출</p>
                    <p className="mt-2 text-3xl font-black text-slate-950">{formatPrice(totalRevenue)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-bold text-slate-500">배송 진행</p>
                    <p className="mt-2 text-3xl font-black text-slate-950">
                        {filteredOrders.filter((order) => ["상품 준비중", "배송중"].includes(order.orderStatus)).length.toLocaleString()}
                    </p>
                </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">주문 목록</h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500">결제, 배송, 취소 상태를 처리합니다.</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="relative w-full sm:w-80">
                            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                value={keyword}
                                onChange={(event) => setKeyword(event.target.value)}
                                placeholder="주문번호, 고객, 상품 검색"
                                className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-3 font-semibold outline-none focus:border-slate-950"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={loadOrders}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-black text-slate-700 hover:bg-slate-50"
                        >
                            <IoRefreshOutline />
                            새로고침
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1080px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-black uppercase text-slate-500">
                            <tr>
                                <th className="px-5 py-3">주문</th>
                                <th className="px-5 py-3">고객</th>
                                <th className="px-5 py-3">상품</th>
                                <th className="px-5 py-3">금액</th>
                                <th className="px-5 py-3">결제</th>
                                <th className="px-5 py-3">상태</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-5 py-8 text-center font-bold text-slate-500">주문을 불러오는 중입니다.</td>
                                </tr>
                            ) : filteredOrders.length > 0 ? filteredOrders.map((order) => (
                                <tr key={order.orderId} className="align-top hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <p className="font-black text-slate-950">#{order.orderId}</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-500">{order.orderDate || "-"}</p>
                                    </td>
                                    <td className="px-5 py-4 font-semibold text-slate-700">{order.email}</td>
                                    <td className="px-5 py-4">
                                        <div className="space-y-2">
                                            {(order.orderItems || []).map((item) => (
                                                <div key={item.orderItemId || `${order.orderId}-${item.product?.productId}`} className="flex items-center gap-3">
                                                    <img src={item.product?.image} alt={item.product?.productName || "상품"} className="h-10 w-10 rounded-lg border border-slate-200 object-cover" />
                                                    <div className="min-w-0">
                                                        <p className="truncate font-bold text-slate-950">{item.product?.productName || "상품명 없음"}</p>
                                                        <p className="text-xs font-semibold text-slate-500">{item.quantity || 0}개</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 font-black text-slate-950">{formatPrice(order.totalAmount || 0)}</td>
                                    <td className="px-5 py-4">
                                        <p className="font-bold text-slate-700">{order.payment?.paymentMethod || "-"}</p>
                                        <p className="mt-1 text-xs font-semibold text-slate-500">{order.payment?.pgStatus || "결제 정보 없음"}</p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <select
                                            value={order.orderStatus || "주문 접수"}
                                            disabled={updatingOrderId === order.orderId}
                                            onChange={(event) => handleStatusChange(order.orderId, event.target.value)}
                                            className="h-10 min-w-36 rounded-lg border border-slate-300 px-3 font-black text-slate-700 outline-none focus:border-slate-950 disabled:bg-slate-100"
                                        >
                                            {orderStatuses.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-5 py-8 text-center font-bold text-slate-500">주문 데이터가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminOrders;
