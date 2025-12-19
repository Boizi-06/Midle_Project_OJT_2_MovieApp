import "../css/payment.css";
import vietqr from "../img/vietqr 1.png";
import vnpay from "../img/vnpay 1.png";
import payoo from "../img/payoo 1.png";
import viettel from "../img/viettel1 1.png";
import { Button, Radio, Row, Col, Card, Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../store/seatSlice"; // Đảm bảo đã import đúng action
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("VietQR");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movieId = 10;

  const { selectedSeats, totalPrice, selectedShowtime, movie } = useSelector(
    (state: RootState) => state.seat
  );

  // Kiểm tra nếu selectedShowtime có giá trị
  useEffect(() => {
    if (!selectedShowtime) {
      // Điều hướng về trang MovieDetail nếu chưa chọn showtime
      navigate("/moviedetail");
    }
  }, [selectedShowtime, navigate]);

  const handlePayment = () => {
    if (!selectedShowtime) {
      alert("Không tìm thấy thông tin suất chiếu!");
      return;
    }

    // Lấy showtimeId từ selectedShowtime
    const bookingData = {
      userId: 1, // Giả sử người dùng là 1 (Cần thay bằng ID người dùng thực tế)
      showtimeId: selectedShowtime.id, // Sử dụng ID của showtime đã chọn
      seatCodes: selectedSeats, // Ghế đã chọn
      totalPrice: totalPrice, // Tổng tiền
      status: "pending", // Đặt giá trị mặc định là "pending"
      createdAt: new Date().toISOString(), // Tạo thời gian hiện tại làm giá trị createdAt
    };

    dispatch(createBooking(bookingData))
      .then(() => {
        // Sau khi lưu thành công, chuyển sang trang thanh toán thành công
        navigate("/paymentsuccess");
      })
      .catch((error) => {
        console.log("Lỗi thanh toán: ", error);
        alert("Đã có lỗi xảy ra khi thanh toán.");
      });
  };

  const handleBack = () => {
    // Quay lại trang MovieDetail
    navigate("/moviedetail");
  };

  const handlePaymentChange = (e) => {
    // Cập nhật phương thức thanh toán
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="container">
      <div className="UI-payment">
        <Header />

        <div className="checkout-container" style={{ paddingTop: "40px" }}>
          <Row gutter={16}>
            {/* Cột thông tin phim */}
            <Col xs={24} md={16}>
              <Card title="Thông tin phim">
                <div className="movie-info">
                  {/* Tên phim và thời gian chiếu */}
                  <Row>
                    <Col span={24}>
                      <p>
                        <strong>Phim:</strong>{" "}
                        {movie?.title || "Phim chưa có tên"}
                      </p>
                      <p>
                        <strong>Giờ chiếu:</strong>{" "}
                        {selectedShowtime?.startTime || "Chưa có giờ chiếu"}
                      </p>
                      <p>
                        <strong>Ghế:</strong> {selectedSeats.join(", ")}{" "}
                        {/* Hiển thị ghế đã chọn */}
                      </p>
                      <p>
                        <strong>Phòng chiếu:</strong>{" "}
                        {selectedShowtime?.screenId || "Chưa có phòng chiếu"}
                      </p>
                      <p>
                        <strong>Định dạng:</strong>{" "}
                        {selectedShowtime?.format || "Chưa có định dạng"}
                      </p>
                    </Col>
                  </Row>
                  <Divider />
                  {/* Thông tin thanh toán */}
                  <Row>
                    <Col span={24}>
                      <p>
                        <strong>Thông tin thanh toán</strong>
                      </p>
                      <div className="table-payment">
                        <div className="table-payment-header">
                          <p>Danh mục</p>
                          <p>Số Lượng</p>
                          <p>Tổng tiền</p>
                        </div>
                        <div className="table-payment-body">
                          <p>Ghế ({selectedSeats.join(", ")})</p>{" "}
                          {/* Hiển thị ghế đã chọn */}
                          <p>{selectedSeats.length}</p>
                          <p>{totalPrice.toLocaleString("vi-VN")}đ</p>{" "}
                          {/* Hiển thị tổng tiền */}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>

            {/* Cột Phương thức thanh toán, Chi phí, Nút thanh toán */}
            <Col xs={24} md={8}>
              <Card title="Thông tin thanh toán">
                <div>
                  <div className="option-payment">
                    <div
                      className="list-option"
                      onChange={handlePaymentChange}
                      value={paymentMethod}
                      style={{ width: "100%" }}
                    >
                      <div className="payment-method">
                        <input type="checkbox" className="custom-checkbox" />
                        <img
                          src={vnpay}
                          alt=""
                          className="payment-method-img"
                        />
                        <span className="payment-method-text">VNPay</span>
                      </div>
                      <div className="payment-method">
                        <input type="checkbox" className="custom-checkbox" />
                        <img
                          src={vnpay}
                          alt=""
                          className="payment-method-img"
                        />
                        <span className="payment-method-text">VNPay</span>
                      </div>
                      <div className="payment-method">
                        <input type="checkbox" className="custom-checkbox" />
                        <img
                          src={vnpay}
                          alt=""
                          className="payment-method-img"
                        />
                        <span className="payment-method-text">VNPay</span>
                      </div>
                      <div className="payment-method">
                        <input type="checkbox" className="custom-checkbox" />
                        <img
                          src={vnpay}
                          alt=""
                          className="payment-method-img"
                        />
                        <span className="payment-method-text">VNPay</span>
                      </div>
                    </div>
                  </div>

                  <div className="payment-details">
                    <p>
                      <strong>Thanh toán: </strong>
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </p>
                    <p>
                      <strong>Phí: </strong>0đ
                    </p>
                    <p>
                      <strong>Tổng cộng: </strong>
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </p>
                  </div>

                  <div className="confirm-btn">
                    <Button
                      type="primary"
                      className="pay-button"
                      onClick={handlePayment}
                    >
                      Thanh toán
                    </Button>
                    <Button
                      type="default"
                      className="back-button"
                      onClick={handleBack}
                    >
                      Quay lại
                    </Button>
                  </div>

                  <Divider />
                  <div className="note">
                    <p>
                      <span>Lưu ý: </span>
                      Không mua vé cho trẻ em dưới 13 tuổi đối với các suất
                      chiếu phim kết thúc sau 22h00 và không mua vé cho trẻ em
                      dưới 16 tuổi đối với các suất chiếu phim kết thúc sau
                      23h00.
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
