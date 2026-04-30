import ProductCard from "./shared/ProductCard"

const About = () => {
    const products = [
        {
            image: "https://embarkx.com/sample/placeholder.png",
            productName: "아이폰 15 프로 맥스",
            description:
                "A15 바이오닉 칩으로 뛰어난 성능을 제공하며, 선명한 슈퍼 레티나 XDR 디스플레이와 고급 카메라 기능으로 놀라운 사진을 찍을 수 있습니다.",
            specialPrice: 1500000,
            price: 2000000,
        },
        {
            image: "https://embarkx.com/sample/placeholder.png",
            productName: "삼성 갤럭시 S24",
            description:
                "선명한 AMOLED 디스플레이와 강력한 카메라, 손에 딱 맞는 세련된 디자인을 경험해보세요.",
            specialPrice: 1200000,
            price: 1000000,
        },
        {
            image: "https://embarkx.com/sample/placeholder.png",
            productName: "구글 픽셀 8",
            description:
                "최첨단 AI 기능과 뛰어난 사진 품질, 멋진 디스플레이를 갖춰 안드로이드 사용자에게 완벽한 선택입니다.",
            specialPrice: 1200000,
            price: 990000,
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 font-notosans">
            <h1 className="text-slate-800 text-3xl font-bold text-center mb-12">
                소개
            </h1>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-y-8 lg:gap-x-12">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <p className="text-base mb-4 leading-relaxed"  style={{ wordBreak: "keep-all" }}>
                    저희 이커머스 스토어에 오신 것을 진심으로 환영합니다!<br /><br />
                    저희는 단순히 제품을 판매하는 것을 넘어, 고객 여러분의 삶을 더욱 편리하고 풍요롭게 만드는 것을 목표로 하고 있습니다. 
                    수많은 상품 중에서 믿을 수 있는 품질의 제품만을 선별하여 소개드리며, 언제나 합리적인 가격과 빠른 배송, 그리고 친절한 고객 서비스를 제공하기 위해 노력하고 있습니다.
                    <br /><br />
                    저희 스토어에서 편안하게 쇼핑하시고, 좋은 경험만 가득하시길 바랍니다.
                    </p>
                </div>

                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img
                        src="https://embarkx.com/sample/placeholder.png"
                        alt="About Us"
                        className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"></img>
                </div>
           </div>
           <div className="py-7 space-y-8">
                <h1 className="text-slate-800 text-3xl font-bold text-center">
                    제품
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <ProductCard 
                        key={index}
                        image={product.image}
                        productName={product.productName}
                        description={product.description}
                        specialPrice={product.specialPrice}
                        price={product.price}
                        about
                    />
                ))
                }
                    

                </div>
            </div>
        </div>
    );
};

export default About;