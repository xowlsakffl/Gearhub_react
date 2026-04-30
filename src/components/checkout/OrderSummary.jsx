import React from "react";
import { formatPriceCalculation } from "../../utils/formatPrice";

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
    return (
        <div className="container mx-auto px-4 mb-8">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 pr-4">
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
                            <p>
                                <strong>배송지 주소: </strong>
                                {address?.addressName ? `${address.addressName}, ${address?.buildingName}` : "-"}
                            </p>
                            <p>
                                <strong>받는 사람: </strong>
                                {address?.recipient || "-"}
                            </p>
                            <p>
                                <strong>연락처: </strong>
                                {address?.recipientNumber || "-"}
                            </p>
                        </div>

                        <div className="p-4 border rounded-lg shadow-sm">
                            <h2 className="text-2xl font-semibold mb-2">결제 수단</h2>
                            <p>
                                <strong>선택한 방식: </strong>
                                {paymentMethod || "-"}
                            </p>
                        </div>

                        <div className="p-4 border rounded-lg shadow-sm mb-6">
                            <h2 className="text-2xl font-semibold mb-2">주문 상품</h2>
                            <div className="space-y-3">
                                {cart?.map((item) => (
                                    <div key={item?.productId} className="flex items-center">
                                        <img
                                            src={item?.image}
                                            alt={item?.productName}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                        <div className="text-gray-500 pl-3">
                                            <p>{item?.productName}</p>
                                            <p>
                                                {item?.quantity}개 x {Number(item?.specialPrice).toLocaleString()}원 ={" "}
                                                {formatPriceCalculation(item?.quantity, item?.specialPrice)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
                    <div className="border rounded-lg shadow-sm p-4 space-y-4">
                        <h2 className="text-2xl font-semibold mb-2">결제 합계</h2>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>상품 금액</span>
                                <span>{formatPriceCalculation(totalPrice, 1)}</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>최종 결제</span>
                                <span>{formatPriceCalculation(totalPrice, 1)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
