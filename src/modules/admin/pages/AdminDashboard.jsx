import React, { useEffect, useMemo, useState } from "react";
import {
    IoAlertCircleOutline,
    IoCubeOutline,
    IoPricetagOutline,
    IoReceiptOutline,
    IoTrendingUpOutline,
} from "react-icons/io5";
import api from "../../../api/api";
import { formatPrice } from "../../../utils/formatPrice";

const StatPanel = ({ icon: Icon, label, value, tone }) => (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
            <div>
                <p className="text-sm font-bold text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
            </div>
            <div className={`grid h-12 w-12 place-items-center rounded-lg ${tone}`}>
                <Icon className="text-2xl" />
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                const [productRes, categoryRes, orderRes] = await Promise.all([
                    api.get("/public/products?pageSize=200&sortBy=productId&sortOrder=desc"),
                    api.get("/public/categories?pageSize=100&sortBy=categoryId&sortOrder=asc"),
                    api.get("/admin/orders"),
                ]);

                setProducts(productRes.data?.content || []);
                setCategories(categoryRes.data?.content || []);
                setOrders(orderRes.data || []);
                setError("");
            } catch (err) {
                console.error(err);
                setError(err?.response?.data?.message || "관리자 데이터를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const totalRevenue = useMemo(
        () => orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0),
        [orders]
    );
    const lowStockProducts = useMemo(
        () => products.filter((product) => Number(product.quantity || 0) <= 5).slice(0, 6),
        [products]
    );
    const latestOrders = useMemo(() => orders.slice(0, 6), [orders]);

    if (loading) {
        return <div className="rounded-lg border border-slate-200 bg-white p-8 font-bold text-slate-600">관리자 데이터를 불러오는 중입니다.</div>;
    }

    if (error) {
        return <div className="rounded-lg border border-rose-200 bg-rose-50 p-8 font-bold text-rose-700">{error}</div>;
    }

    return (
        <div className="space-y-7">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatPanel icon={IoCubeOutline} label="등록 상품" value={products.length.toLocaleString()} tone="bg-cyan-50 text-cyan-700" />
                <StatPanel icon={IoPricetagOutline} label="카테고리" value={categories.length.toLocaleString()} tone="bg-emerald-50 text-emerald-700" />
                <StatPanel icon={IoReceiptOutline} label="주문" value={orders.length.toLocaleString()} tone="bg-amber-50 text-amber-700" />
                <StatPanel icon={IoTrendingUpOutline} label="매출" value={formatPrice(totalRevenue)} tone="bg-rose-50 text-rose-700" />
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                        <h2 className="text-lg font-black text-slate-950">최근 주문</h2>
                        <span className="text-sm font-bold text-slate-500">{orders.length.toLocaleString()}건</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-black uppercase text-slate-500">
                                <tr>
                                    <th className="px-5 py-3">주문번호</th>
                                    <th className="px-5 py-3">고객</th>
                                    <th className="px-5 py-3">금액</th>
                                    <th className="px-5 py-3">상태</th>
                                    <th className="px-5 py-3">주문일</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {latestOrders.length > 0 ? latestOrders.map((order) => (
                                    <tr key={order.orderId} className="hover:bg-slate-50">
                                        <td className="px-5 py-4 font-black text-slate-950">#{order.orderId}</td>
                                        <td className="px-5 py-4 font-semibold text-slate-700">{order.email}</td>
                                        <td className="px-5 py-4 font-bold text-slate-950">{formatPrice(order.totalAmount || 0)}</td>
                                        <td className="px-5 py-4">
                                            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-black text-slate-700">
                                                {order.orderStatus || "상태 없음"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 font-semibold text-slate-500">{order.orderDate || "-"}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-5 py-8 text-center font-bold text-slate-500">주문 데이터가 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
                        <IoAlertCircleOutline className="text-xl text-amber-600" />
                        <h2 className="text-lg font-black text-slate-950">재고 확인</h2>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {lowStockProducts.length > 0 ? lowStockProducts.map((product) => (
                            <div key={product.productId} className="flex items-center gap-4 px-5 py-4">
                                <img
                                    src={product.image}
                                    alt={product.productName}
                                    className="h-14 w-14 rounded-lg border border-slate-200 object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-black text-slate-950">{product.productName}</p>
                                    <p className="text-sm font-semibold text-slate-500">{product.categoryName || "미분류"}</p>
                                </div>
                                <span className="rounded-md bg-amber-50 px-2 py-1 text-sm font-black text-amber-700">
                                    {product.quantity || 0}개
                                </span>
                            </div>
                        )) : (
                            <div className="px-5 py-8 text-center font-bold text-slate-500">부족 재고가 없습니다.</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
