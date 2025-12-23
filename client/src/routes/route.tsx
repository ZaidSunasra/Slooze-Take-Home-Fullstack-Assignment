import LandingPage from "@/modules/auth/pages/LandingPage";
import OrdersPage from "@/modules/orders/page/OrdersPage";
import PaymentPage from "@/modules/payment/pages/PaymentPage";
import CartPage from "@/modules/restaurant/pages/CartPage";
import RestaurantPage from "@/modules/restaurant/pages/RestaurantPage";
import { BrowserRouter, Route, Routes } from "react-router";

const Router = () => {
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<LandingPage />} />
            <Route path="/restaurants" element={<RestaurantPage />} />
			<Route path="/orders" element={<OrdersPage />} />
			<Route path="/cart"  element={<CartPage />} />
			<Route path="/payment"  element={<PaymentPage />} />
		</Routes>
	</BrowserRouter>
};

export default Router;
