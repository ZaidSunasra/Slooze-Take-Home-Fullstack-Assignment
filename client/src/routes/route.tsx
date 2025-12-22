import LandingPage from "@/modules/auth/pages/LandingPage";
import RestaurantPage from "@/modules/restaurant/pages/RestaurantPage";
import { BrowserRouter, Route, Routes } from "react-router";

const Router = () => {
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<LandingPage />} />
            <Route path="/restaurants" element={<RestaurantPage />} />
		</Routes>
	</BrowserRouter>
};

export default Router;
