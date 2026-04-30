import { PuffLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex flex-col items-center gap-1">
                <PuffLoader color="#1976d2" />
            </div>
        </div>
        
    );
};

export default Loader;