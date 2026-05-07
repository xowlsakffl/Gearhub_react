import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";
import AccountDashboard from "../../components/account/AccountDashboard";
import LogIn from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import Cart from "../../components/cart/Cart";
import Checkout from "../../components/checkout/Checkout";
import Home from "../../components/home/Home";
import OrderHistory from "../../components/account/OrderHistory";
import ProductDetail from "../../components/products/ProductDetail";
import Products from "../../components/products/Products";
import Navbar from "../../components/shared/Navbar";

const ShopRoutes = () => (
    <React.Fragment>
        <Navbar />
        <Routes>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />

            <Route element={<PrivateRoute />}>
                <Route path="checkout" element={<Checkout />} />
                <Route path="account" element={<AccountDashboard />} />
                <Route path="account/orders" element={<OrderHistory />} />
            </Route>

            <Route element={<PrivateRoute publicPage />}>
                <Route path="login" element={<LogIn />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    </React.Fragment>
);

export default ShopRoutes;
