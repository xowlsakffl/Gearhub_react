import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { bannerLists } from "../../utils";

const gradients = [
    "from-[#111111] via-[#1f2937] to-[#0f766e]",
    "from-[#111827] via-[#1f2937] to-[#7c2d12]",
    "from-[#172033] via-[#111827] to-[#1d4ed8]",
];

const HeroBanner = () => {
    return (
        <section className="font-notosans">
            <Swiper
                grabCursor
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                navigation
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                slidesPerView={1}
            >
                {bannerLists.map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <div
                            className={`relative overflow-hidden rounded-[30px] bg-gradient-to-r ${gradients[index]} shadow-[0_18px_45px_rgba(15,23,42,0.12)]`}
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_45%,rgba(255,255,255,0.03))]" />
                            <div className="absolute right-[-48px] top-[-48px] h-56 w-56 rounded-[36px] border border-white/10 bg-white/5 blur-[2px]" />
                            <div className="relative grid min-h-[380px] items-center gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 xl:px-14">
                                <div className="order-2 lg:order-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                                            오늘의 셀렉션
                                        </span>
                                        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                                            {item.categoryLabel}
                                        </span>
                                    </div>

                                    <h2 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[2.75rem] xl:text-[3rem]">
                                        {item.title}
                                    </h2>
                                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200 sm:text-base">
                                        {item.subtitle}
                                    </p>
                                    <p className="mt-4 max-w-[56ch] text-sm leading-7 text-white/75 sm:text-base">
                                        {item.description}
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Link
                                            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                                            to="/products"
                                        >
                                            전체 상품 보기
                                        </Link>
                                        <Link
                                            className="rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                                            to="/login"
                                        >
                                            로그인
                                        </Link>
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        {item.tags?.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 sm:text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="order-1 flex items-center justify-center lg:order-2">
                                    <div className="relative w-full max-w-[540px]">
                                        <div className="absolute -right-5 bottom-6 hidden rounded-2xl border border-white/20 bg-white px-4 py-3 text-slate-900 shadow-lg md:block">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                                                인기 포인트
                                            </p>
                                            <p className="mt-2 text-sm font-semibold">{item.highlight}</p>
                                        </div>

                                        <div className="flex h-[250px] w-full items-center justify-center rounded-[30px] border border-white/35 bg-white/95 p-5 shadow-[0_28px_70px_rgba(15,23,42,0.18)] lg:h-[315px] lg:p-7">
                                            <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#f8fafc,#eef2ff)] p-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.subtitle}
                                                    className="h-full w-full object-contain object-center"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroBanner;
