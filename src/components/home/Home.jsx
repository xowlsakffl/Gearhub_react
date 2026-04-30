import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="lg:px-14 sm:px-8 px-4 font-notosans">
            <div className="py-6">
                <HeroBanner />
            </div>

            <div className="py-5">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-slate-700 text-3xl font-bold">오늘의 발견</h1>
                        <span className="text-slate-700">
                            당신을 위해 골라낸 인기 아이템, 지금 확인해보세요!
                        </span>
                </div>

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
                    <div className="pb-6 pt-6 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                        {products && 
                            products?.slice(0,4)
                                    .map((item, i) => <ProductCard key={i} {...item}/>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;