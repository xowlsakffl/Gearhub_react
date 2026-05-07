import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/actions";

const paymentMethods = [
    { value: "Demo", label: "데모 결제" },
    { value: "Stripe", label: "카드 결제" },
    { value: "Kakao", label: "카카오페이" },
    { value: "Naver", label: "네이버페이" },
    { value: "Paypal", label: "페이팔" },
];

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const syncedCartSignature = useRef("");
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart } = useSelector((state) => state.carts);
    const { errorMessage } = useSelector((state) => state.errors);

    useEffect(() => {
        if (!cart?.length || errorMessage) {
            return;
        }

        const sendCartItems = cart
            .filter((item) => item?.productId && Number(item?.quantity) > 0)
            .map((item) => ({
                productId: item.productId,
                quantity: Number(item.quantity),
            }));

        const cartSignature = JSON.stringify(sendCartItems);
        if (!sendCartItems.length || syncedCartSignature.current === cartSignature) {
            return;
        }

        syncedCartSignature.current = cartSignature;
        dispatch(createUserCart(sendCartItems));
    }, [dispatch, cart, errorMessage]);

    const paymentMethodHandler = (method) => {
        dispatch(addPaymentMethod(method));
    };

    return (
        <div className="mx-auto mt-16 max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h1 className="mb-4 text-2xl font-bold text-slate-900">결제 수단</h1>
            <FormControl>
                <RadioGroup
                    aria-label="payment method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(event) => paymentMethodHandler(event.target.value)}
                >
                    {paymentMethods.map((method) => (
                        <FormControlLabel
                            key={method.value}
                            value={method.value}
                            control={<Radio color="primary" />}
                            label={method.label}
                            className="text-slate-700"
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default PaymentMethod;
