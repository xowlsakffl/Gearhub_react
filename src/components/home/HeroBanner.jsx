import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { bannerLists } from "../../utils";

const colors = ["bg-slate-900", "bg-[#2b3448]", "bg-[#16324f]"];

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
                        <div className={`overflow-hidden rounded-2xl ${colors[index]} shadow-lg`}>
                            <div className="grid min-h-[420px] items-center gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
                                <div className="order-2 lg:order-1">
                                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">
                                        GearHub Curation
                                    </p>
                                    <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                                        {item.title}
                                    </h2>
                                    <p className="mt-3 text-lg font-semibold text-slate-200">{item.subtitle}</p>
                                    <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
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
                                            데모 계정으로 시작
                                        </Link>
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-slate-200 sm:text-sm">
                                        <span className="rounded-full border border-slate-600 px-3 py-2">데모 주문 가능</span>
                                        <span className="rounded-full border border-slate-600 px-3 py-2">장바구니 시드 제공</span>
                                        <span className="rounded-full border border-slate-600 px-3 py-2">주문 이력 확인</span>
                                    </div>
                                </div>

                                <div className="order-1 flex items-center justify-center lg:order-2">
                                    <img
                                        src={item.image}
                                        alt={item.subtitle}
                                        className="max-h-[320px] w-full max-w-[520px] object-contain"
                                    />
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
