import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { bannerLists } from "../../utils";

const colors = ["bg-slate-950", "bg-[#162033]", "bg-[#0f2942]"];

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
                        <div className={`overflow-hidden rounded-[28px] ${colors[index]} shadow-lg`}>
                            <div className="grid min-h-[340px] items-center gap-8 px-6 py-8 lg:grid-cols-[1.35fr_0.65fr] lg:px-12">
                                <div className="order-2 lg:order-1">
                                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">
                                        GearHub Electronics
                                    </p>
                                    <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[3rem]">
                                        {item.title}
                                    </h2>
                                    <p className="mt-3 text-base font-semibold text-slate-200 sm:text-lg">{item.subtitle}</p>
                                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                                        {item.description}
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Link
                                            className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                                            to="/products"
                                        >
                                            전체 상품 보기
                                        </Link>
                                        <Link
                                            className="rounded-md border border-slate-500 px-5 py-3 text-sm font-semibold text-white transition hover:border-slate-200"
                                            to="/login"
                                        >
                                            로그인
                                        </Link>
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                                        <span>컴퓨팅 · 오디오 · 게이밍</span>
                                        <span>모바일 액세서리</span>
                                        <span>인기 할인 상품</span>
                                    </div>
                                </div>

                                <div className="order-1 flex items-center justify-center lg:order-2">
                                    <div className="flex h-[220px] w-full max-w-[620px] items-center justify-center lg:h-[280px]">
                                        <img
                                            src={item.image}
                                            alt={item.subtitle}
                                            className="h-full w-full rounded-2xl object-cover object-center"
                                        />
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
