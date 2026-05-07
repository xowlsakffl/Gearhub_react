import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { submitDemoOrder } from "../../store/actions";
import { formatPrice } from "../../utils/formatPrice";

const DemoPayment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);
    const { cart, totalPrice } = useSelector((state) => state.carts);

    const handleSubmit = () => {
        if (!selectedUserCheckoutAddress?.addressId) {
            toast.error("배송지를 먼저 선택해 주세요.");
            return;
        }

        if (!cart?.length) {
            toast.error("주문할 상품이 없습니다.");
            return;
        }

        dispatch(
            submitDemoOrder(
                {
                    addressId: selectedUserCheckoutAddress.addressId,
                    paymentMethod: "Demo",
                    pgName: "GearHub Demo Checkout",
                    pgPaymentId: `demo-${Date.now()}`,
                    pgStatus: "PAID",
                    pgResponseMessage: `데모 결제 승인: ${totalPrice}`,
                },
                toast,
                navigate,
                setLoading
            )
        );
    };

    return (
        <div className="mx-auto max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">데모 결제</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
                실제 결제 승인 없이 현재 장바구니와 배송지 정보로 주문을 생성합니다.
            </p>

            <div className="mt-6 space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <div className="flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">배송지</span>
                    <span className="text-right font-bold">{selectedUserCheckoutAddress?.title || "-"}</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">주문 상품</span>
                    <span className="font-bold">{cart?.length || 0}개</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">결제 금액</span>
                    <span className="font-bold">{formatPrice(totalPrice || 0)}</span>
                </div>
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`mt-6 w-full rounded-lg px-4 py-3 font-bold text-white transition ${
                    loading ? "bg-slate-400" : "bg-slate-950 hover:bg-slate-700"
                }`}
            >
                {loading ? "주문 처리 중" : "주문 완료"}
            </button>
        </div>
    );
};

export default DemoPayment;
