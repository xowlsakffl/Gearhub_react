import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { IoAddOutline, IoCreateOutline, IoRefreshOutline, IoTrashOutline } from "react-icons/io5";
import api from "../../../api/api";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const [categoryRes, productRes] = await Promise.all([
                api.get("/public/categories?pageSize=100&sortBy=categoryId&sortOrder=asc"),
                api.get("/public/products?pageSize=200&sortBy=productId&sortOrder=desc"),
            ]);
            setCategories(categoryRes.data?.content || []);
            setProducts(productRes.data?.content || []);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "카테고리를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const productCountByCategory = useMemo(() => {
        return products.reduce((acc, product) => {
            const key = product.categoryName || "미분류";
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
    }, [products]);

    const resetForm = () => {
        setCategoryName("");
        setEditingCategoryId(null);
    };

    const handleEdit = (category) => {
        setCategoryName(category.categoryName || "");
        setEditingCategoryId(category.categoryId);
    };

    const handleDelete = async (category) => {
        const productCount = productCountByCategory[category.categoryName] || 0;
        const confirmed = window.confirm(`${category.categoryName} 카테고리를 삭제할까요? 연결 상품 ${productCount}개도 영향을 받을 수 있습니다.`);
        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/admin/categories/${category.categoryId}`);
            toast.success("카테고리를 삭제했습니다.");
            resetForm();
            await loadCategories();
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "카테고리 삭제에 실패했습니다.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const trimmedName = categoryName.trim();
        if (!trimmedName) {
            toast.error("카테고리명을 입력해 주세요.");
            return;
        }

        try {
            setSaving(true);
            if (editingCategoryId) {
                await api.put(`/admin/categories/${editingCategoryId}`, { categoryName: trimmedName });
                toast.success("카테고리를 수정했습니다.");
            } else {
                await api.post("/admin/categories", { categoryName: trimmedName });
                toast.success("카테고리를 등록했습니다.");
            }
            resetForm();
            await loadCategories();
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "카테고리 저장에 실패했습니다.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
            <form onSubmit={handleSubmit} className="h-fit rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-4">
                    <h2 className="text-xl font-black text-slate-950">{editingCategoryId ? "카테고리 수정" : "카테고리 등록"}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">상품 분류 기준을 관리합니다.</p>
                </div>
                <div className="space-y-4 p-5">
                    <label className="space-y-2">
                        <span className="text-sm font-black text-slate-700">카테고리명</span>
                        <input
                            value={categoryName}
                            onChange={(event) => setCategoryName(event.target.value)}
                            className="h-11 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-slate-950"
                            placeholder="예: 노트북"
                        />
                    </label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-black text-slate-700 hover:bg-slate-50"
                        >
                            <IoRefreshOutline />
                            초기화
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white disabled:bg-slate-400"
                        >
                            <IoAddOutline />
                            {saving ? "저장 중" : editingCategoryId ? "수정" : "등록"}
                        </button>
                    </div>
                </div>
            </form>

            <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">카테고리 목록</h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500">{categories.length.toLocaleString()}개 분류</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-black uppercase text-slate-500">
                            <tr>
                                <th className="px-5 py-3">분류명</th>
                                <th className="px-5 py-3">연결 상품</th>
                                <th className="px-5 py-3 text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="px-5 py-8 text-center font-bold text-slate-500">카테고리를 불러오는 중입니다.</td>
                                </tr>
                            ) : categories.length > 0 ? categories.map((category) => (
                                <tr key={category.categoryId} className="hover:bg-slate-50">
                                    <td className="px-5 py-4 font-black text-slate-950">{category.categoryName}</td>
                                    <td className="px-5 py-4 font-bold text-slate-600">{productCountByCategory[category.categoryName] || 0}개</td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button type="button" onClick={() => handleEdit(category)} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100" title="수정">
                                                <IoCreateOutline />
                                            </button>
                                            <button type="button" onClick={() => handleDelete(category)} className="grid h-9 w-9 place-items-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50" title="삭제">
                                                <IoTrashOutline />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="px-5 py-8 text-center font-bold text-slate-500">등록된 카테고리가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminCategories;
