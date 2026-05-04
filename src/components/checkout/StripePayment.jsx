import { Alert, AlertTitle, Skeleton } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import { createStripePaymentSecret } from "../../store/actions";

const StripePayment = () => {
    const dispatch = useDispatch();
    const { clientSecret } = useSelector((state) => state.auth);
    const { totalPrice } = useSelector((state) => state.carts);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const stripePromise = useMemo(
        () => (publishableKey ? loadStripe(publishableKey) : null),
        [publishableKey]
    );

    useEffect(() => {
        if (!publishableKey || clientSecret) {
            return;
        }

        dispatch(createStripePaymentSecret(totalPrice));
    }, [clientSecret, dispatch, publishableKey, totalPrice]);

    if (!publishableKey) {
        return (
            <div className="max-w-lg mx-auto">
                <Alert severity="warning">
                    <AlertTitle>Stripe 키 없음</AlertTitle>
                    카드 결제를 사용하려면 Stripe 공개 키를 먼저 설정해 주세요. 현재는 기본 결제를 이용할 수 있습니다.
                </Alert>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="max-w-lg mx-auto">
                <Skeleton />
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="max-w-lg mx-auto">
                <Alert severity="error">{errorMessage}</Alert>
            </div>
        );
    }

    return clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
    ) : null;
};

export default StripePayment;
