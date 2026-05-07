import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
    IoAddOutline,
    IoCreateOutline,
    IoRefreshOutline,
    IoSearchOutline,
    IoTrashOutline,
} from "react-icons/io5";
import api from "../../../api/api";
import { formatPrice } from "../../../utils/formatPrice";

const emptyForm = {
    productName: "",
    brand: "",
    categoryId: "",
    image: "",
    price: "",
    discount: "0",
    quantity: "",
    description: "",
    summarySpecs: "",
    shippingInfo: "",
};

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingProductId, setEditingProductId] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadCatalog = async () => {
        try {
            setLoading(true);
            const [productRes, categoryRes] = await Promise.all([
                api.get("/public/products?pageSize=200&sortBy=productId&sortOrder=desc"),
                api.get("/public/categories?pageSize=100&sortBy=categoryId&sortOrder=asc"),
            ]);
            setProducts(productRes.data?.content || []);
            setCategories(categoryRes.data?.content || []);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "상품 정보를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCatalog();
    }, []);

    const filteredProducts = useMemo(() => {
        const value = keyword.trim().toLowerCase();
        if (!value) {
            return products;
        }

        return products.filter((product) => {
            const target = [
                product.productName,
                product.brand,
                product.categoryName,
                product.summarySpecs,
            ].join(" ").toLowerCase();
            return target.includes(value);
        });
    }, [keyword, products]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingProductId(null);
    };

    const handleEdit = (product) => {
        setEditingProductId(product.productId);
        setForm({
            productName: product.productName || "",
            brand: product.brand || "",
            categoryId: product.categoryId || "",
            image: product.image || "",
            price: product.price ?? "",
            discount: product.discount ?? "0",
            quantity: product.quantity ?? "",
            description: product.description || "",
            summarySpecs: product.summarySpecs || "",
            shippingInfo: product.shippingInfo || "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (product) => {
        const confirmed = window.confirm(`${product.productName} 상품을 삭제할까요?`);
        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/admin/products/${product.productId}`);
            toast.success("상품을 삭제했습니다.");
            await loadCatalog();
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "상품 삭제에 실패했습니다.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!form.categoryId) {
            toast.error("카테고리를 선택해 주세요.");
            return;
        }

        const payload = {
            ...form,
            categoryId: Number(form.categoryId),
            price: Number(form.price || 0),
            discount: Number(form.discount || 0),
            quantity: Number(form.quantity || 0),
        };

        try {
            setSaving(true);
            if (editingProductId) {
                await api.put(`/admin/products/${editingProductId}`, payload);
                toast.success("상품을 수정했습니다.");
            } else {
                await api.post(`/admin/categories/${payload.categoryId}/product`, payload);
                toast.success("상품을 등록했습니다.");
            }
            resetForm();
            await loadCatalog();
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "상품 저장에 실패했습니다.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">{editingProductId ? "상품 수정" : "상품 등록"}</h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500">상품명, 가격, 재고, 노출 이미지를 관리합니다.</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-black text-slate-700 hover:bg-slate-50"
                        >
                            <IoRefreshOutline />
                            초기화
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            <IoAddOutline />
                            {saving ? "저장 중" : editingProductId ? "수정" : "등록"}
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 p-5 lg:grid-cols-4">
                    <label className="space-y-2">
                        <span className="text-sm font-black text-slate-700">상품명</span>
                        <input name="productName" value={form.productName} onChange={handleChange} required className="h-11 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-slate-950" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-black text-slate-700">브랜드</span>
                        <input name="brand" value={form.brand} onChange={handleChange} className="h-11 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-slate-950" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-black text-slate-700">카테고리</span>
                        <select name="categoryId" value={form.categoryId} onChange={handleChange} required className="h-11 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-slate-950">
                            <option value="">선택</option>
                            {categories.map((category) => (
                                <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                            ))}
                        </select>
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-black text-slate-700">이미지 URL</span>
                        <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className="h-11 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-slate-950" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-black text-slate-700">정가</span>
                        <input name="price" value={form.price} onChange={handleChange} type="number" min="0" required className="h-11 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-slate-950" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-black text-slate-700">할인율</span>
                        <input name="discount" value={form.discount} onChange={handleChange} type="number" min="0" max="100" className="h-11 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-slate-950" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-black text-slate-700">재고</span>
                        <input name="quantity" value={form.quantity} onChange={handleChange} type="number" min="0" required className="h-11 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-slate-950" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-black text-slate-700">배송 정보</span>
                        <input name="shippingInfo" value={form.shippingInfo} onChange={handleChange} className="h-11 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-slate-950" />
                    </label>
                    <label className="space-y-2 lg:col-span-2">
                        <span className="text-sm font-black text-slate-700">주요 사양</span>
                        <input name="summarySpecs" value={form.summarySpecs} onChange={handleChange} className="h-11 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-slate-950" />
                    </label>
                    <label className="space-y-2 lg:col-span-2">
                        <span className="text-sm font-black text-slate-700">상세 설명</span>
                        <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 font-semibold outline-none focus:border-slate-950" />
                    </label>
                </div>
            </form>

            <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">상품 목록</h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500">{products.length.toLocaleString()}개 상품</p>
                    </div>
                    <div className="relative w-full lg:w-80">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                            placeholder="상품, 브랜드, 카테고리 검색"
                            className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-3 font-semibold outline-none focus:border-slate-950"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1040px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-black uppercase text-slate-500">
                            <tr>
                                <th className="px-5 py-3">상품</th>
                                <th className="px-5 py-3">카테고리</th>
                                <th className="px-5 py-3">가격</th>
                                <th className="px-5 py-3">할인</th>
                                <th className="px-5 py-3">재고</th>
                                <th className="px-5 py-3">배송</th>
                                <th className="px-5 py-3 text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-5 py-8 text-center font-bold text-slate-500">상품을 불러오는 중입니다.</td>
                                </tr>
                            ) : filteredProducts.length > 0 ? filteredProducts.map((product) => (
                                <tr key={product.productId} className="hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} alt={product.productName} className="h-14 w-14 rounded-lg border border-slate-200 object-cover" />
                                            <div className="min-w-0">
                                                <p className="truncate font-black text-slate-950">{product.productName}</p>
                                                <p className="truncate text-sm font-semibold text-slate-500">{product.brand || "브랜드 없음"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 font-bold text-slate-700">{product.categoryName || "미분류"}</td>
                                    <td className="px-5 py-4 font-black text-slate-950">{formatPrice(product.specialPrice || product.price || 0)}</td>
                                    <td className="px-5 py-4 font-semibold text-rose-600">{Number(product.discount || 0)}%</td>
                                    <td className="px-5 py-4">
                                        <span className={`rounded-md px-2 py-1 text-xs font-black ${Number(product.quantity || 0) <= 5 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                                            {product.quantity || 0}개
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 font-semibold text-slate-500">{product.shippingInfo || "-"}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button type="button" onClick={() => handleEdit(product)} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100" title="수정">
                                                <IoCreateOutline />
                                            </button>
                                            <button type="button" onClick={() => handleDelete(product)} className="grid h-9 w-9 place-items-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50" title="삭제">
                                                <IoTrashOutline />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" className="px-5 py-8 text-center font-bold text-slate-500">검색 결과가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminProducts;
