import facebook from "../img/Facebook (1).png";
import youtube from "../img/youtube.png";
import google from "../img/googlePlay.png";
import zalo from "../img/zalo.png";
import appstore from "../img/appStore.png";
import copyright from "../img/Copyright.png";
import "../css/footer.css";
export default function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer-links">
          <a href="../pages/policy.html">Chính sách</a>
          <a href="../pages/calender.html">Lịch chiếu</a>
          <a href="../pages/news.html">Tin tức</a>
          <a href="../pages/ticketPrice.html">Giá vé</a>
          <a href="#">Hỏi đáp</a>
          <a href="#">Liên hệ</a>
        </div>

        <div className="footer-icons">
          <img src={facebook} alt="Facebook" />
          <img src={zalo} alt="Zalo" />
          <img src={youtube} alt="YouTube" />
          <img src={google} alt="Google Play" />
          <img src={appstore} alt="App Store" />
          <img src={copyright} alt="Bộ Công Thương" />
        </div>

        <div className="footer-text">
          <p>
            Cơ quan chủ quản: <strong>BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</strong>
          </p>
          <p>Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.</p>
          <p>
            Giấy phép số: 224/GP-TTĐT ngày 31/8/2010 - Chịu trách nhiệm: Vũ Đức
            Tùng – Giám đốc.
          </p>
          <p>
            Địa chỉ: 87 Láng Hạ, Quận Ba Đình, Tp. Hà Nội - Điện thoại:
            024.35141791
          </p>
          <p className="copyright">© 2023 By NCC - All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
