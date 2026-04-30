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
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center gap-4">
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input type="text" placeholder="제품 검색" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]" />
                <FiSearch className="absolute left-3 text-slate-800 size={20}" />
            </div>

            <div className="flex lg:flex-row flex-col gap-2 items-center">
                <FormControl
                    className="text-slate-800 border-slate-700"
                    variant="outlined"
                    size="small">
                        <InputLabel id="category-select-label">카테고리</InputLabel>
                        <Select 
                            className="min-w-[120px] text-slate-800 border-slate-700"
                            labelId="category-select-label"
                            value={category}
                            onChange={handleCategoryChange}
                            sx={{ fontSize: '0.9rem', minWidth: '120px', color: '#1e293b' }} 
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
                className="h-10 min-w-[90px] px-3 py-2 text-sm flex items-center gap-2 bg-rose-700 text-white rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
                onClick={handleClearFilters}
                >
                <FiRefreshCw size={14} />
                    <span className="font-semibold text-sm">필터 초기화</span>
                </button>
            </div>
        </div>
    );
};

export default Filter;