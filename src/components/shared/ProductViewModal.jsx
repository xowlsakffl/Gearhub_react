import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Divider } from "@mui/material";
import Status from "./Status";
import { MdClose, MdDone } from "react-icons/md";
import { formatPrice } from "../../utils/formatPrice";

function ProductViewModal({ open, setOpen, product, isAvailable }) {
    const { productName, image, description, categoryName, price, specialPrice } = product || {};

    return (
        <Dialog open={open} as="div" className="relative z-10" onClose={() => setOpen(false)}>
            <DialogBackdrop className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm transition-opacity" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="relative w-full overflow-hidden rounded-[28px] bg-white shadow-2xl transition-all md:min-w-[720px] md:max-w-[720px]">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                        >
                            <MdClose size={20} />
                        </button>

                        {image ? (
                            <div className="flex aspect-[16/10] justify-center bg-[linear-gradient(180deg,#f8fafc,#eef2ff)] p-8">
                                <img src={image} alt={productName} className="h-full w-full object-contain" />
                            </div>
                        ) : null}

                        <div className="px-6 pb-6 pt-8 sm:px-8">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    {categoryName ? (
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                            {categoryName}
                                        </p>
                                    ) : null}
                                    <DialogTitle as="h1" className="text-2xl font-semibold leading-8 text-slate-900 sm:text-[2rem]">
                                        {productName}
                                    </DialogTitle>
                                </div>

                                {isAvailable ? (
                                    <Status text="재고 있음" icon={MdDone} bg="bg-emerald-100" color="text-emerald-800" />
                                ) : (
                                    <Status text="품절" icon={MdClose} bg="bg-rose-100" color="text-rose-700" />
                                )}
                            </div>

                            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        {specialPrice ? (
                                            <>
                                                <span className="text-base text-slate-400 line-through">
                                                    {formatPrice(price)}
                                                </span>
                                                <span className="text-2xl font-bold text-slate-900">
                                                    {formatPrice(specialPrice)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-2xl font-bold text-slate-900">
                                                {formatPrice(price)}
                                            </span>
                                        )}
                                    </div>

                                    <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-500">
                                        빠른 배송 상품
                                    </span>
                                </div>
                            </div>

                            <Divider className="!my-6" />

                            <p className="text-sm leading-7 text-slate-600">{description}</p>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={() => setOpen(false)}
                                    type="button"
                                    className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-800 hover:text-slate-900"
                                >
                                    닫기
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export default ProductViewModal;
