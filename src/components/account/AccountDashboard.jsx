import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBoxOpen, FaMapMarkerAlt, FaShoppingBag } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import api from "../../api/api";
import { getUserAddresses } from "../../store/actions";
import { formatPrice } from "../../utils/formatPrice";

const AccountDashboard = () => {
    const dispatch = useDispatch();
    const { user, address } = useSelector((state) => state.auth);
    const { cart, totalPrice } = useSelector((state) => state.carts);
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        if (!address?.length) {
            dispatch(getUserAddresses());
        }
    }, [address?.length, dispatch]);

    useEffect(() => {
        let active = true;

        api.get("/orders/users")
            .then(({ data }) => {
                if (active) {
                    setOrderCount(data.length);
                }
            })
            .catch(() => {
                if (active) {
                    setOrderCount(0);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const summaryCards = useMemo(() => ([
        {
            label: "장바구니",
            value: `${cart?.length || 0}건`,
            subtext: totalPrice ? formatPrice(totalPrice) : "담긴 상품 없음",
            icon: <FaShoppingBag className="text-lg" />,
            href: "/cart",
        },
        {
            label: "주문 이력",
            value: `${orderCount}건`,
            subtext: "결제 후 이력이 여기에 쌓입니다",
            icon: <FaBoxOpen className="text-lg" />,
            href: "/account/orders",
        },
        {
            label: "저장된 배송지",
            value: `${address?.length || 0}곳`,
            subtext: "체크아웃에서 바로 선택",
            icon: <FaMapMarkerAlt className="text-lg" />,
            href: "/checkout",
        },
    ]), [address?.length, cart?.length, orderCount, totalPrice]);

    return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-50 font-notosans">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
                <section className="rounded-2xl bg-slate-900 px-6 py-8 text-white shadow-lg sm:px-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-300">GearHub Account</p>
                    <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold sm:text-4xl">{user?.username}님의 쇼핑 대시보드</h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                                워크스페이스, 오디오, 게이밍, 모바일 기어를 한 곳에서 고르고
                                주문 내역과 배송지를 빠르게 관리할 수 있게 정리했습니다.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                to="/products"
                                className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                            >
                                상품 둘러보기
                            </Link>
                            <Link
                                to="/account/orders"
                                className="rounded-md border border-slate-500 px-4 py-3 text-sm font-semibold text-white transition hover:border-slate-300 hover:bg-slate-800"
                            >
                                주문 이력 보기
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mt-8 grid gap-4 md:grid-cols-3">
                    {summaryCards.map((card) => (
                        <Link
                            key={card.label}
                            to={card.href}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <span className="rounded-full bg-slate-100 p-3 text-slate-700">{card.icon}</span>
                                <MdOutlineKeyboardArrowRight className="text-xl text-slate-400" />
                            </div>
                            <p className="mt-5 text-sm font-semibold text-slate-500">{card.label}</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">{card.value}</p>
                            <p className="mt-2 text-sm text-slate-500">{card.subtext}</p>
                        </Link>
                    ))}
                </section>

                <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">추천 사용 흐름</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    포트폴리오 데모를 빠르게 확인할 수 있는 핵심 화면만 남겼습니다.
                                </p>
                            </div>
                            <Link to="/checkout" className="text-sm font-semibold text-slate-700 underline">
                                체크아웃 이동
                            </Link>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            {[
                                { step: "01", title: "상품 탐색", desc: "카테고리와 검색으로 원하는 기어를 찾습니다." },
                                { step: "02", title: "장바구니 구성", desc: "데모 계정 기준 장바구니가 미리 채워져 있습니다." },
                                { step: "03", title: "테스트 주문", desc: "실제 PG 없이 주문/이력/재고 흐름을 확인합니다." },
                            ].map((item) => (
                                <div key={item.step} className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs font-bold tracking-[0.3em] text-slate-400">{item.step}</p>
                                    <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">저장된 배송지</h2>
                                <p className="mt-1 text-sm text-slate-500">체크아웃에서 바로 선택 가능한 주소입니다.</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {address?.length ? (
                                address.slice(0, 3).map((item) => (
                                    <div key={item.addressId} className="rounded-xl border border-slate-200 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                                            <span className="text-xs text-slate-400">{item.postalCode}</span>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-600">{item.addressName}</p>
                                        <p className="mt-1 text-sm text-slate-500">{item.recipient} · {item.recipientNumber}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                                    저장된 배송지가 없습니다.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AccountDashboard;
