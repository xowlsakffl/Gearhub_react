import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "../../store/actions";

const paymentMethods = [
    { value: "Demo", label: "데모 결제" },
    { value: "Stripe", label: "카드 결제" },
    { value: "Kakao", label: "카카오페이" },
    { value: "Naver", label: "네이버페이" },
    { value: "Paypal", label: "페이팔" },
];

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const { paymentMethod } = useSelector((state) => state.payment);

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
