import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    IoBarChartOutline,
    IoCubeOutline,
    IoGridOutline,
    IoLogOutOutline,
    IoPricetagOutline,
    IoReceiptOutline,
    IoStorefrontOutline,
} from "react-icons/io5";
import { logOutUser } from "../../../store/actions";

const menuItems = [
    { to: "/admin", label: "대시보드", icon: IoGridOutline, end: true },
    { to: "/admin/products", label: "상품 관리", icon: IoCubeOutline },
    { to: "/admin/categories", label: "카테고리", icon: IoPricetagOutline },
    { to: "/admin/orders", label: "주문 관리", icon: IoReceiptOutline },
];

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logOutUser(navigate));
    };

    return (
        <div className="min-h-screen bg-[#f4f7fb] text-slate-950">
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
                <div className="border-b border-slate-200 px-7 py-6">
                    <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white">
                            <IoBarChartOutline className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-lg font-black leading-none">GearHub Admin</p>
                            <p className="mt-1 text-xs font-semibold text-slate-500">쇼핑몰 운영 관리</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 px-4 py-5">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    [
                                        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition",
                                        isActive
                                            ? "bg-slate-950 text-white shadow-sm"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                                    ].join(" ")
                                }
                            >
                                <Icon className="text-lg" />
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="space-y-3 border-t border-slate-200 p-4">
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    >
                        <IoStorefrontOutline className="text-lg" />
                        스토어 이동
                    </NavLink>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50"
                    >
                        <IoLogOutOutline className="text-lg" />
                        로그아웃
                    </button>
                </div>
            </aside>

            <main className="min-h-screen lg:pl-72">
                <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
                    <div className="flex min-h-20 flex-col justify-center gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                        <div>
                            <p className="text-xs font-black uppercase text-slate-500">관리자 콘솔</p>
                            <h1 className="text-2xl font-black text-slate-950">GearHub 운영센터</h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <nav className="flex gap-2 lg:hidden">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <NavLink
                                            key={item.to}
                                            to={item.to}
                                            end={item.end}
                                            className={({ isActive }) =>
                                                [
                                                    "grid h-10 w-10 place-items-center rounded-lg border text-lg",
                                                    isActive
                                                        ? "border-slate-950 bg-slate-950 text-white"
                                                        : "border-slate-200 bg-white text-slate-600",
                                                ].join(" ")
                                            }
                                            title={item.label}
                                        >
                                            <Icon />
                                        </NavLink>
                                    );
                                })}
                            </nav>
                            <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                                {user?.username || "admin"}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mx-auto w-full max-w-[1500px] px-5 py-7 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
