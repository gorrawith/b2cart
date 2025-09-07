import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";

const Home = ()=>{
    return (
        <div id="Home" className="mt-10">
            <MainBanner/>
            <Categories/>
            <BestSeller/>
            <BottomBanner/>
        </div>
    )
}
export default Home