import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetail from "../pages/MovieDetail";
import Payment from "../pages/Payment";
import PaymentSuccess from "../pages/PaymentSuccess";
import Home from "../pages/Home";
import LoginUser from "../pages/LoginUser";
import RegisterUser from "../pages/RegisterUser";
import LoginAdmin from "../pages/auth/LoginAdmin";
import AdminUser from "../pages/Admin/AdminUser";
import CreatAdmin from "../pages/auth/CreatAdmin";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/moviedetail" element={<MovieDetail />} />

        <Route path="/home" element={<Home />} />

        <Route path="/" element={<LoginUser />} />

        <Route path="/loginUser" element={<LoginUser />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/admin" element={<LoginAdmin />} />

        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path="/CreatAdmin" element={<CreatAdmin />} />

        <Route
          path="/paymentsuccess"
          element={<PaymentSuccess></PaymentSuccess>}
        />

        <Route path="admin/manager" element={<AdminUser />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
