import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`);
        }, 700);

        return () => {
            clearTimeout(handler);
        };
    }, [searchParams, searchTerm, navigate, pathname]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(selectedCategory);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = prevOrder === "asc" ? "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathname}?${params}`);
            return newOrder;
        });
    };

    const handleClearFilters = () => {
        navigate({ pathname: window.location.pathname });
    };

    return (
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="relative flex w-full items-center xl:max-w-[640px]">
                    <FiSearch className="absolute left-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="제품 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-slate-300 focus:bg-white"
                    />
                </div>

                <div className="flex flex-wrap gap-2 xl:justify-end">
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="h-11 min-w-[150px] rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
                    >
                        <option value="all">전체 카테고리</option>
                        {categories.map((item) => (
                            <option key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={toggleSortOrder}
                        className="inline-flex h-11 min-w-[104px] items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                        정렬
                        {sortOrder === "asc" ? <FiArrowUp size={16} /> : <FiArrowDown size={16} />}
                    </button>

                    <button
                        type="button"
                        className="inline-flex h-11 min-w-[124px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                        onClick={handleClearFilters}
                    >
                        <FiRefreshCw size={14} />
                        필터 초기화
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
