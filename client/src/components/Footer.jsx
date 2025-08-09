import { assets, footerLinks } from "../assets/assets";
import { useAppContext } from '../context/AppContext'

const Footer = () => {
    const {navigate} = useAppContext()
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 
                    border-b border-gray-500/30 text-gray-500">
                <div>
                    <img 
                        className="w-34 md:w-32" 
                        src={assets.logo} 
                        alt="logo" 
                    />
                    <p className="max-w-[410px] mt-6">เราจัดส่งสินค้าสดใหม่ถึงประตูหน้าบ้านคุณ เรามุ่งมั่นที่จะทำให้ประสบการณ์
                        การช้อปปิ้งของคุณง่ายและคุ้มค่า ด้วยความไว้วางใจจากลูกค้าหลายหมื่นราย
                    </p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                        <div>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                                Quick Links
                            </h3>
                            <ul className="text-sm space-y-1">   
                                    <li>
                                        <a 
                                            href="#"                                            
                                            className="hover:underline transition cursor-pointer">
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"                                             
                                            className="hover:underline transition cursor-pointer">
                                            Best Sellers
                                        </a>
                                    </li>
                                    <li>
                                        <a                                             
                                            className="hover:underline transition cursor-pointer">
                                            Offers & Deals
                                        </a>
                                    </li>
                                    <li>
                                        <a 
                                            onClick={()=> navigate("/contact")}                                            
                                            className="hover:underline transition cursor-pointer">
                                            Contact us
                                        </a>
                                    </li>
                                    <li>
                                        <a                                             
                                            className="hover:underline transition cursor-pointer">
                                            FAQs
                                        </a>
                                    </li>
                                
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                                Need Help?
                            </h3>
                            <ul className="text-sm space-y-1">   
                                    <li>
                                        <a                                             
                                            className="hover:underline transition cursor-pointer">
                                            Delivery Information
                                        </a>
                                    </li>
                                    <li>
                                        <a                                             
                                            className="hover:underline transition cursor-pointer">
                                            Return & Refund Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a                                             
                                            className="hover:underline transition cursor-pointer">
                                            Payment Methods
                                        </a>
                                    </li>
                                    <li>
                                        <a                                             
                                            className="hover:underline transition cursor-pointer">
                                            Track your Order
                                        </a>
                                    </li>
                                    
                                
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                                Follow Us
                            </h3>
                            <ul className="text-sm space-y-1">   
                                    <li>
                                        <a 
                                            onClick={()=>window.open("https://www.instagram.com/")}                                            
                                            className="hover:underline transition cursor-pointer">
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={()=>window.open("https://www.facebook.com/")}                                             
                                            className="hover:underline transition cursor-pointer">
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={()=>window.open("https://www.tiktok.com/explore")}                                             
                                            className="hover:underline transition cursor-pointer">
                                            Tiktok
                                        </a>
                                    </li>
                                
                            </ul>
                        </div>
                    
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                Copyright {new Date().getFullYear()} ©  b2time.
            </p>
        </div>
        
    );
};

export default Footer