import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Divider } from "@mui/material";
import Status from "./Status";
import { MdClose, MdDone } from "react-icons/md";
import { formatPrice } from "../../utils/formatPrice";

function ProductViewModal({ open, setOpen, product, isAvailable }) {
    const { productName, image, description, categoryName, price, specialPrice } = product || {};

    return (
        <Dialog open={open} as="div" className="relative z-10" onClose={() => setOpen(false)}>
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="relative w-full transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:min-w-[620px] md:max-w-[620px]"
                    >
                        {image ? (
                            <div className="flex aspect-[16/11] justify-center bg-slate-50 p-6">
                                <img src={image} alt={productName} className="h-full w-full object-contain" />
                            </div>
                        ) : null}

                        <div className="px-6 pb-2 pt-10">
                            {categoryName ? (
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{categoryName}</p>
                            ) : null}
                            <DialogTitle as="h1" className="mb-4 text-xl font-semibold leading-6 text-gray-800 sm:text-2xl lg:text-3xl">
                                {productName}
                            </DialogTitle>
                            <div className="space-y-2 pb-4 text-gray-700">
                                <div className="flex items-center justify-between gap-2">
                                    {specialPrice ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 line-through">
                                                {formatPrice(price)}
                                            </span>
                                            <span className="font-semibold text-slate-700 sm:text-xl">
                                                {formatPrice(specialPrice)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-xl font-bold">
                                            {formatPrice(price)}
                                        </span>
                                    )}

                                    {isAvailable ? (
                                        <Status
                                            text="재고 있음"
                                            icon={MdDone}
                                            bg="bg-teal-200"
                                            color="text-teal-900"
                                        />
                                    ) : (
                                        <Status
                                            text="품절"
                                            icon={MdClose}
                                            bg="bg-rose-200"
                                            color="text-rose-700"
                                        />
                                    )}
                                </div>
                                <Divider />
                                <p>{description}</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 px-6 py-4">
                            <button
                                onClick={() => setOpen(false)}
                                type="button"
                                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-800 hover:text-slate-800"
                            >
                                닫기
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export default ProductViewModal;
