const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null,
}

const calculateTotalPrice = (cart) =>
    cart.reduce((sum, item) => sum + Number(item?.specialPrice || 0) * Number(item?.quantity || 0), 0);

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId
            );

            if(existingProduct) {
                const updatedCart = state.cart.map((item) => {
                    if (item.productId === productToAdd.productId) {
                        return productToAdd;
                    } else {
                        return item;
                    }
                });

                return {
                    ...state,
                    cart: updatedCart,
                    totalPrice: calculateTotalPrice(updatedCart),
                };
            } else {
                const newCart = [...state.cart, productToAdd];
                return {
                    ...state,
                    cart: newCart,
                    totalPrice: calculateTotalPrice(newCart),
                };
            }
        case "REMOVE_CART":
            const filteredCart = state.cart.filter(
                (item) => item.productId !== action.payload.productId
            );
            return {
                ...state,
                cart: filteredCart,
                totalPrice: calculateTotalPrice(filteredCart),
            };
        case "GET_USER_CART_PRODUCTS":
            return {
                ...state,
                cart: action.payload,
                totalPrice: action.totalPrice,
                cartId: action.cartId,
            };
        case "CLEAR_CART":
            return { cart:[], totalPrice: 0, cartId: null};
        default:
            return state;
    }
    return state;
}
