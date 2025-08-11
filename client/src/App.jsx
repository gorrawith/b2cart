import "./App.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Loading from "./components/Loading";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import SellerLoginPage from "./pages/seller/SellerLoginPage";
import Register from "./pages/Register";

const App =() => {

  const isSellerPath =  useLocation().pathname.includes("seller");
  const {showUserLogin,isSeller}=useAppContext()

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin ? <Login/> : null}

      <Toaster/>

      <div className={`${isSellerPath ? "" : 
          "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='/loader' element={<Loading/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLoginPage/>}>
            <Route index element={isSeller ? <AddProduct/> : null }/>
            <Route path='product-list' element={<ProductList/>}/>
            <Route path="orders" element={<Orders/>}/>
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  );
}

export default App;
