import Footer from "../components/Footer";
import Header from "../components/Header";
import "../css/paymentsuccess.css";
import star from "../img/excellence 1 (1).svg";

import { useNavigate } from "react-router-dom";
export default function PaymentSuccess() {
  const navigate = useNavigate();
  const handlBack = () => {
    navigate("/moviedetail");
  };
  return (
    <div className="container">
      <Header></Header>
      <div className="body">
        <img src={star} alt="" />
        <span className="Book-success">Đặt vé thành công!</span>

        <div className="note">
          <p>
            <span>Lưu ý: </span>
            Không mua vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim kết
            thúc sau 22h00 và không mua vé cho trẻ em dưới 16 tuổi đối với các
            suất chiếu phim kết thúc sau 23h00.
          </p>
        </div>
        <button id="btn-home" onClick={handlBack}>
          Về Trang chủ
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
}
