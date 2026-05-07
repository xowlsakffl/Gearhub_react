import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ publicPage = false, requiredRoles = [] }) => {
    const { user } = useSelector((state) => state.auth);

    if (publicPage) {
        return user ? <Navigate to="/" replace /> : <Outlet />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const hasRequiredRole = requiredRoles.length === 0
        || requiredRoles.some((role) => user?.roles?.includes(role));

    return hasRequiredRole ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
