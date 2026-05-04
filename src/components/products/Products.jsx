import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Pagination";

const Products = () => {
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    const {products, categories, pagination} = useSelector(
        (state) => state.products
    );
    const dispatch = useDispatch();
    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="mx-auto max-w-[1560px] px-4 py-12 font-notosans sm:px-8 lg:px-10 xl:px-12">
            <Filter categories={categories ? categories : []} />
            {isLoading ? (
                <Loader />
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-[200px]">
                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
                    <span className="text-slate-800 text-lg font-medium">
                        {errorMessage}
                    </span>
                </div>
            ) : (
                <div className="min-h-[700px]">
                    <div className="grid gap-x-6 gap-y-6 pb-6 pt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {products &&
                            products.map((item) => <ProductCard key={item.productId} {...item} />)
                        }
                    </div>
                    <div className="flex justify-center pt-10">
                        <Paginations 
                            numberOfPage={pagination?.totalPages} 
                            totalProducts={pagination?.totalElements} 
                            />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
