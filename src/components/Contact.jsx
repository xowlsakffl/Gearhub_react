import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
    return(
        <div
            className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center font-notosans"
            style={{backgroundImage: "url('')"}}>
            
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center mb-6">Contact us</h1>
                <p className="text-gray-600 text-center mb-4">
                    문의 사항이 있으시면 언제든 연락 주세요!
                </p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            이름
                        </label>
                        <input 
                            type="text"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500"/>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            이메일
                        </label>
                        <input 
                            type="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            내용
                        </label>
                        <textarea 
                            rows="4"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500"/>
                    </div>

                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        보내기
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <h2 className="text-lg font-semibold">고객센터</h2>
                    <div className="flex flex-col items-center space-y-2 mt-4">
                        <div className="flex items-center">
                            <FaPhone className="text-blue-500 mr-2"/>
                            <span className="text-gray-600">+820000000</span>
                        </div>

                        <div className="flex items-center">
                            <FaEnvelope className="text-blue-500 mr-2"/>
                            <span className="text-gray-600">ms1114@kakao.com</span>
                        </div>

                        <div className="flex items-center">
                            <FaMapMarkedAlt className="text-blue-500 mr-2"/>
                            <span className="text-gray-600">경기도 용인시 OOO</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Contact;