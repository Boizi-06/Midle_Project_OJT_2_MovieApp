import AppHeader from "../../components/Header";
import Footer from "../../components/Footer";
import moviecard from "../../img/bannerNewdetail.png";
export default function NewDetail() {
  return (
    <div>
      <div>
        <AppHeader />
      </div>
      <div style={{ maxWidth: "1480px", margin: "20px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "10px",
            lineHeight: "1",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#ffffffff",
              marginBottom: "1rem",
            }}
          >
            Chương trình phim kỷ niệm 70 năm Giải phóng Thủ đô
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#BBB",
              marginBottom: "1.5rem",
            }}
          >
            Nhân dịp 70 năm ngày Giải phóng Thủ đô (10/10/1954 – 10/10/2024),
            Trung tâm Chiếu phim Quốc gia tổ chức chương trình phim kỷ niệm này.
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#BBB",
              marginBottom: "1.5rem",
            }}
          >
            Bộ phim được chọn chiếu minh họa trong chương trình phim lần này là:
            "Bảo, Phố Piano". Tác phẩm này đã nhận được hàng giải thưởng danh
            giá từ các liên hoan phim quốc tế và nhiều lần đại diện cho điện ảnh
            Việt Nam đấu giải Oscar 2023.
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#BBB",
              marginBottom: "1.5rem",
            }}
          >
            1- Thời gian chiếu phim: Từ 6/10- 10/10/2024
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#BBB",
              marginBottom: "1.5rem",
            }}
          >
            2- Địa điểm: Phòng chiếu số 12
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#BBB",
              marginBottom: "1.5rem",
            }}
          >
            3- Suất chiếu: 10h00 và 20h15
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#BBB",
              marginBottom: "1.5rem",
            }}
          >
            4- Hình thức nhận vé: Khách hàng nhận vé 0 đồng trực tiếp tại quầy
            vé từ 8h00 đến 23h00 hàng ngày, bắt đầu từ ngày 4/10/2024 đến khi
            hết vé (khán giả có thể nhận vé trước ngày xem phim và mỗi khách
            nhận tối đa 02 vé/người).
          </p>
          <div>
            <img src={moviecard} alt="" />
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
