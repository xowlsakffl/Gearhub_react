import api from "../../api/api";

export const fetchProducts = (queryString = "") => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const requestUrl = queryString ? `/public/products?${queryString}` : "/public/products";
        const { data } = await api.get(requestUrl);

        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "상품 정보를 불러오지 못했습니다.",
        });
    }
};

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get("/public/categories");

        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "CATEGORY_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "카테고리 정보를 불러오지 못했습니다.",
        });
    }
};

export const addToCart = (data, qty = 1, toast) =>
    (dispatch, getState) => {
        const { products } = getState().products;
        const matchedProduct = products.find((item) => item.productId === data.productId);

        if (!matchedProduct) {
            toast.error("상품 정보를 다시 불러와 주세요.");
            return;
        }

        const hasEnoughQuantity = matchedProduct.quantity >= qty;

        if (hasEnoughQuantity) {
            dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
            toast.success(`${data?.productName} 상품을 장바구니에 담았습니다.`);
            return;
        }

        toast.error("재고가 부족합니다.");
    };

export const increaseCartQuantity =
    (data, toast, currentQuantity, setCurrentQuantity) =>
        (dispatch, getState) => {
            const { products } = getState().products;
            const matchedProduct = products.find((item) => item.productId === data.productId);

            if (!matchedProduct) {
                toast.error("상품 정보를 다시 불러와 주세요.");
                return;
            }

            const hasEnoughQuantity = matchedProduct.quantity >= currentQuantity + 1;

            if (hasEnoughQuantity) {
                const newQuantity = currentQuantity + 1;
                setCurrentQuantity(newQuantity);

                dispatch({
                    type: "ADD_CART",
                    payload: { ...data, quantity: newQuantity },
                });

                localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
                return;
            }

            toast.error("재고가 부족합니다.");
        };

export const decreaseCartQuantity =
    (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: { ...data, quantity: newQuantity },
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    };

export const removeFromCart =
    (data, toast) => (dispatch, getState) => {
        dispatch({ type: "REMOVE_CART", payload: data });
        toast.success(`${data.productName} 상품을 장바구니에서 제거했습니다.`);
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    };

export const authenticateSignInUser =
    (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signin", sendData);
            dispatch({ type: "LOGIN_USER", payload: data });
            localStorage.setItem("auth", JSON.stringify(data));
            await Promise.allSettled([
                dispatch(getUserCart()),
                dispatch(getUserAddresses()),
            ]);
            reset();
            toast.success("로그인에 성공했습니다.");
            navigate("/account/orders");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "로그인 중 오류가 발생했습니다.");
        } finally {
            setLoader(false);
        }
    };

export const registerNewUser =
    (sendData, toast, reset, navigate, setLoader) => async () => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signup", sendData);
            reset();
            toast.success(data?.message || "회원가입이 완료되었습니다.");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message
                || error?.response?.data?.password
                || "회원가입 중 오류가 발생했습니다."
            );
        } finally {
            setLoader(false);
        }
    };

export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("auth");
    localStorage.removeItem("CHECKOUT_ADDRESS");
    localStorage.removeItem("client-secret");
    navigate("/login");
};

export const addUpdateUserAddress =
    (sendData, toast, addressId, setOpenAddressModal) => async (dispatch) => {
        dispatch({ type: "BUTTON_LOADER" });

        try {
            if (!addressId) {
                await api.post("/addresses", sendData);
            } else {
                await api.put(`/addresses/${addressId}`, sendData);
            }

            await dispatch(getUserAddresses());
            toast.success("배송지를 저장했습니다.");
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "배송지 저장에 실패했습니다.");
            dispatch({ type: "IS_ERROR", payload: null });
        } finally {
            setOpenAddressModal(false);
        }
    };

export const deleteUserAddress =
    (toast, addressId, setOpenDeleteModal) => async (dispatch) => {
        try {
            dispatch({ type: "BUTTON_LOADER" });
            await api.delete(`/addresses/${addressId}`);
            dispatch({ type: "IS_SUCCESS" });
            await dispatch(getUserAddresses());
            dispatch(clearCheckoutAddress());
            toast.success("배송지를 삭제했습니다.");
        } catch (error) {
            console.log(error);
            dispatch({
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "배송지 삭제 중 오류가 발생했습니다.",
            });
        } finally {
            setOpenDeleteModal(false);
        }
    };

export const clearCheckoutAddress = () => ({
    type: "REMOVE_CHECKOUT_ADDRESS",
});

export const getUserAddresses = () => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get("/addresses");
        dispatch({ type: "USER_ADDRESS", payload: data });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "배송지 정보를 불러오지 못했습니다.",
        });
    }
};

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));

    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    };
};

export const addPaymentMethod = (method) => ({
    type: "ADD_PAYMENT_METHOD",
    payload: method,
});

export const createUserCart = (sendCartItems) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post("/cart/create", sendCartItems);
        await dispatch(getUserCart());
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "장바구니 동기화에 실패했습니다.",
        });
    }
};

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get("/carts/users/cart");

        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products || [],
            totalPrice: data.totalPrice || 0,
            cartId: data.cartId || null,
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "장바구니 정보를 불러오지 못했습니다.",
        });
    }
};

export const createStripePaymentSecret =
    (totalPrice) => async (dispatch) => {
        try {
            dispatch({ type: "IS_FETCHING" });
            const { data } = await api.post("/order/stripe-client-secret", {
                amount: Number(totalPrice) * 100,
                currency: "usd",
            });

            dispatch({ type: "CLIENT_SECRET", payload: data });
            localStorage.setItem("client-secret", JSON.stringify(data));
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            dispatch({
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "스트라이프 결제 준비에 실패했습니다.",
            });
        }
    };

export const submitDemoOrder =
    (sendData, toast, navigate, setLoading) => async (dispatch) => {
        try {
            setLoading(true);
            dispatch({ type: "IS_FETCHING" });
            await api.post("/order/users/payments/demo", sendData);
            localStorage.removeItem("CHECKOUT_ADDRESS");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("client-secret");
            dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
            dispatch({ type: "CLEAR_CART" });
            dispatch({ type: "IS_SUCCESS" });
            toast.success("테스트 주문이 완료되었습니다.");
            navigate("/");
        } catch (error) {
            console.log(error);
            dispatch({
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "주문 처리 중 오류가 발생했습니다.",
            });
            toast.error(error?.response?.data?.message || "주문 처리 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

export const stripePaymentConfirmation =
    (sendData, setErrorMesssage, setLoadng, toast) => async (dispatch) => {
        try {
            const response = await api.post("/order/users/payments/online", sendData);
            if (response.data) {
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
                dispatch({ type: "CLEAR_CART" });
                toast.success("주문이 접수되었습니다.");
            } else {
                setErrorMesssage("결제에 실패했습니다. 다시 시도해 주세요.");
            }
        } catch (error) {
            setErrorMesssage("결제에 실패했습니다. 다시 시도해 주세요.");
        } finally {
            setLoadng(false);
        }
    };
