import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/actions";

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart, cartId } = useSelector((state) => state.carts);
    const { errorMessage } = useSelector((state) => state.errors);

    useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            }));

            dispatch(createUserCart(sendCartItems));
        }
    }, [dispatch, cart, cartId, errorMessage]);

    const paymentMethodHandler = (method) => {
        dispatch(addPaymentMethod(method));
    };

    return (
        <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border">
            <h1 className="text-2xl font-semibold mb-4">결제 수단</h1>
            <FormControl>
                <RadioGroup
                    aria-label="payment method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => paymentMethodHandler(e.target.value)}
                >
                    <FormControlLabel
                        value="Demo"
                        control={<Radio color="primary" />}
                        label="기본 결제"
                        className="text-gray-700"
                    />

                    <FormControlLabel
                        value="Stripe"
                        control={<Radio color="primary" />}
                        label="카드 결제"
                        className="text-gray-700"
                    />

                    <FormControlLabel
                        value="Kakao"
                        control={<Radio color="primary" />}
                        label="카카오페이"
                        className="text-gray-700"
                    />

                    <FormControlLabel
                        value="Naver"
                        control={<Radio color="primary" />}
                        label="네이버페이"
                        className="text-gray-700"
                    />

                    <FormControlLabel
                        value="Paypal"
                        control={<Radio color="primary" />}
                        label="페이팔"
                        className="text-gray-700"
                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default PaymentMethod;
