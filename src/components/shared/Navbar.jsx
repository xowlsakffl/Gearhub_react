import { Badge } from "@mui/material";
import { useState } from "react";
import { FaLaptop, FaSignInAlt, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu";

const navItems = [
    { label: "홈", to: "/" },
    { label: "스토어", to: "/products" },
    { label: "브랜드 소개", to: "/about" },
    { label: "문의", to: "/contact" },
];

const Navbar = () => {
    const pathname = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { cart } = useSelector((state) => state.carts);
    const { user } = useSelector((state) => state.auth);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex h-[78px] max-w-[1520px] items-center justify-between px-4 sm:px-8 lg:px-10 xl:px-12">
                <Link to="/" className="flex items-center gap-3">
                    <span className="rounded-full bg-slate-900 p-2.5 text-white shadow-sm">
                        <FaLaptop className="text-lg" />
                    </span>
                    <div>
                        <p className="text-lg font-bold text-slate-900">GearHub</p>
                        <p className="hidden text-xs text-slate-500 sm:block">
                            컴퓨팅 · 오디오 · 게이밍 · 모바일 액세서리
                        </p>
                    </div>
                </Link>

                <nav
                    className={`absolute left-0 top-[78px] w-full border-b border-slate-200 bg-white px-4 py-4 shadow-lg transition-all sm:static sm:w-auto sm:border-none sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none ${
                        navbarOpen ? "max-h-[320px]" : "max-h-0 overflow-hidden sm:max-h-none sm:overflow-visible"
                    }`}
                >
                    <ul className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold transition ${
                                        pathname === item.to
                                            ? "bg-slate-900 text-white"
                                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                                    onClick={() => setNavbarOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        <li className="py-1">
                            <Link
                                to="/cart"
                                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${
                                    pathname === "/cart"
                                        ? "border-slate-900 bg-slate-900 text-white"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                                }`}
                                onClick={() => setNavbarOpen(false)}
                            >
                                <Badge
                                    showZero
                                    badgeContent={cart?.length || 0}
                                    color="primary"
                                    overlap="circular"
                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                >
                                    <FaShoppingCart size={18} />
                                </Badge>
                            </Link>
                        </li>

                        {user?.id ? (
                            <li>
                                <UserMenu />
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                                    onClick={() => setNavbarOpen(false)}
                                >
                                    <FaSignInAlt />
                                    로그인
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                <button
                    className="sm:hidden"
                    type="button"
                    onClick={() => setNavbarOpen((prev) => !prev)}
                >
                    {navbarOpen ? (
                        <RxCross2 className="text-3xl text-slate-900" />
                    ) : (
                        <IoIosMenu className="text-3xl text-slate-900" />
                    )}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
