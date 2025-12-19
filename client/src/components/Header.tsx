import "../css/header.css";
import logo from "../img/image (11).png";
export default function Header() {
  return (
    <div>
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <img src={logo} alt="" className="header-logo" />
            <div className="header-text">
              <p>TRUNG TÂM CHIẾU PHIM QUỐC GIA</p>
              <p>National Cinema Center</p>
            </div>
            <nav className="header-nav-links">
              <a href="../pages/homepages.html">Trang chủ</a>
              <a href="../pages/calender.html">Lịch chiếu</a>
              <a href="../pages/news.html">Tin tức</a>
              <a href="../pages/promotions.html">Khuyến mãi</a>
              <a href="../pages/ticketPrice.html">Giá vé</a>
              <a href="../pages/festival.html">Liên hoan phim</a>
            </nav>
          </div>
          <div className="header-right">
            <div id="header-buttons" className="header-buttons">
              <button id="btn-register">Đăng ký</button>
              <button id="btn-login">Đăng nhập</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
