import { Avatar, Menu, MenuItem } from "@mui/material";
import React from "react";
import { IoExitOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BackDrop from "./BackDrop";
import { logOutUser } from "../store/actions";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdmin = user?.roles?.includes("ROLE_ADMIN");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOutHandler = () => {
        handleClose();
        dispatch(logOutUser(navigate));
    };

    return (
        <div className="relative z-30">
            <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-2 py-1 text-slate-700 transition hover:shadow-md"
                onClick={handleClick}
            >
                <Avatar sx={{ width: 28, height: 28, bgcolor: "#0f172a", fontSize: 14 }}>
                    {user?.username?.slice(0, 1)?.toUpperCase() || "G"}
                </Avatar>
                <span className="hidden text-sm font-semibold sm:block">{user?.username}</span>
            </button>

            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "user-menu",
                    sx: { width: 210 },
                }}
            >
                {isAdmin && (
                    <Link to="/admin">
                        <MenuItem className="!flex !items-center !gap-2" onClick={handleClose}>
                            <IoShieldCheckmarkOutline className="text-slate-500" />
                            <span className="font-semibold">관리자</span>
                        </MenuItem>
                    </Link>
                )}

                <Link to="/account">
                    <MenuItem className="!flex !items-center !gap-2" onClick={handleClose}>
                        <FaUserCircle className="text-slate-500" />
                        <span className="font-semibold">내 계정</span>
                    </MenuItem>
                </Link>

                <Link to="/account/orders">
                    <MenuItem className="!flex !items-center !gap-2" onClick={handleClose}>
                        <FaBoxOpen className="text-slate-500" />
                        <span className="font-semibold">주문 내역</span>
                    </MenuItem>
                </Link>

                <MenuItem className="!p-2" onClick={logOutHandler}>
                    <div className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-white">
                        <IoExitOutline className="text-xl" />
                        <span className="font-bold">로그아웃</span>
                    </div>
                </MenuItem>
            </Menu>

            {open && <BackDrop />}
        </div>
    );
};

export default UserMenu;
