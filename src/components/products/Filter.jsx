import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({categories}) => {
    

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
            }else{
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

        if(selectedCategory === "all"){
            params.delete("category");
        }else{
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = (prevOrder === "asc") ? "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathname}?${params}`);
            return newOrder;
        });
    };

    const handleClearFilters = () => {
        navigate({pathname: window.location.pathname});
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="relative flex w-full items-center xl:max-w-[560px]">
                    <input
                        type="text"
                        placeholder="제품 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-md border border-slate-300 py-3 pl-11 pr-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                    />
                    <FiSearch className="absolute left-4 text-slate-500" />
                </div>

                <div className="flex flex-wrap gap-2 xl:justify-end">
                <FormControl
                    className="text-slate-800 border-slate-700"
                    variant="outlined"
                    size="small">
                        <InputLabel id="category-select-label">카테고리</InputLabel>
                        <Select 
                            className="min-w-[140px] text-slate-800 border-slate-700"
                            labelId="category-select-label"
                            value={category}
                            onChange={handleCategoryChange}
                            sx={{ fontSize: '0.9rem', minWidth: '140px', color: '#1e293b' }} 
                            label="카테고리">
                                <MenuItem value="all" sx={{ fontSize: '0.9rem' }}>전체</MenuItem>
                                {categories.map((item) => (
                                    <MenuItem key={item.categoryId} value={item.categoryName} sx={{ fontSize: '0.9rem' }}>
                                        {item.categoryName}
                                    </MenuItem>
                                ))}
                        </Select>
                </FormControl>

                <Tooltip title="정렬">
                    <Button 
                        variant="contained" 
                        onClick={toggleSortOrder}
                        color="primary" 
                        className="!h-10 !min-w-[90px] px-3 py-2 text-sm flex items-center gap-2 shadow-md">
                        정렬
                        {sortOrder === "asc" ? (
                        <FiArrowUp size={16} />
                        ) : (
                        <FiArrowDown size={16} />
                        )}
                    </Button>
                </Tooltip>

                <button
                className="flex h-10 min-w-[110px] items-center gap-2 rounded-md bg-rose-700 px-3 py-2 text-sm text-white shadow-md transition duration-300 ease-in focus:outline-none"
                onClick={handleClearFilters}
                >
                <FiRefreshCw size={14} />
                    <span className="font-semibold text-sm">필터 초기화</span>
                </button>
            </div>
            </div>
        </div>
    );
};

export default Filter;
