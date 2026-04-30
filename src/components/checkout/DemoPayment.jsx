import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { submitDemoOrder } from "../../store/actions";

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
                    pgName: "Local Demo Checkout",
                    pgPaymentId: `demo-${Date.now()}`,
                    pgStatus: "PAID",
                    pgResponseMessage: `데모 결제 완료: ${totalPrice}`,
                },
                toast,
                navigate,
                setLoading
            )
        );
    };

    return (
        <div className="max-w-lg mx-auto border rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-800">테스트 주문</h2>
            <p className="mt-3 text-sm text-slate-600 leading-6">
                실제 PG 연동 없이 주문, 재고 차감, 장바구니 비우기까지 확인하는 데모 결제입니다.
            </p>

            <div className="mt-6 rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700 space-y-2">
                <div className="flex justify-between">
                    <span>선택한 배송지</span>
                    <span>{selectedUserCheckoutAddress?.title || "-"}</span>
                </div>
                <div className="flex justify-between">
                    <span>주문 상품 수</span>
                    <span>{cart?.length || 0}개</span>
                </div>
                <div className="flex justify-between">
                    <span>결제 방식</span>
                    <span>Demo</span>
                </div>
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`mt-6 w-full rounded-md px-4 py-3 font-semibold text-white transition ${
                    loading ? "bg-slate-400" : "bg-slate-900 hover:bg-slate-700"
                }`}
            >
                {loading ? "주문 처리 중..." : "테스트 주문 완료"}
            </button>
        </div>
    );
};

export default DemoPayment;
