import "../css/MovieDetail.css";
import avt from "../img/avtMovie.png";

import screen from "../img/screen 1.png";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeatsByScreen,
  fetchShowtimesByMovie,
  selectSeat,
  clearSelectedSeats,
  fetchShowtime,
  fetchMovieById,
} from "../store/seatSlice";
import type { AppDispatch, RootState } from "../store";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MovieDetail() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [SelectedTimeToSelect, setSelectedTimeToSelect] = useState<
    string | null
  >(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedSeats, bookedSeats, seats, totalPrice, showtimes, movie } =
    useSelector((state: RootState) => state.seat);

  const screenId = 2;
  const movieId = 10; // Lấy từ API hoặc từ route params
  const date = "2025-03-01";

  useEffect(() => {
    dispatch(fetchSeatsByScreen({ screenId }));
    dispatch(fetchShowtimesByMovie({ movieId, screenId, date }));
    dispatch(fetchMovieById(movieId)); // Lấy thông tin phim từ API
  }, [dispatch, movieId]);
  const handleSeatClick = (seat: string) => {
    // Nếu ghế đã được đặt, không cho phép chọn

    if (bookedSeats.includes(seat)) {
      console.log("Ghế này đã bị mua: ", seat);
      return;
    }
    dispatch(selectSeat(seat));
    console.log("Đã chọn ghế: ", seat);
  };

  // console.log("g", seats);

  const handlePayment = () => {
    // Lưu ghế đã chọn vào Redux (sử dụng setBookedSeats để lưu vào bookedSeats)

    // Điều hướng sang trang thanh toán
    navigate("/payment");
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    dispatch(fetchShowtime({ movieId, screenId, date, startTime: time }));

    // Tính thời gian chọn ghế, trừ đi 1 tiếng từ giờ chiếu
    const showtimeDate = new Date(`${date} ${time}`);
    showtimeDate.setHours(showtimeDate.getHours() - 1); // Trừ đi 1 tiếng

    const timeToSelect = showtimeDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    console.log("Thời gian chọn ghế: ", timeToSelect); // Thời gian sau khi trừ 1 tiếng

    // Cập nhật trạng thái hoặc thông tin theo nhu cầu
    setSelectedTimeToSelect(timeToSelect); // Lưu vào state hoặc hiển thị
  };

  const handleBack = () => {
    setSelectedTime(null);
    dispatch(clearSelectedSeats());
  };

  const seatTypeMap = useMemo(() => {
    const map = new Map<string, "normal" | "vip">();
    seats.forEach((s) => map.set(s.code, s.type));
    return map;
  }, [seats]);

  // Hiển thị thông tin phim
  const movieTitle = movie?.title || "Phim chưa có tên";
  const movieDescription = movie?.description || "Mô tả phim chưa có";
  const movieCast = movie?.actors?.join(", ") || "Diễn viên chưa được cập nhật";

  return (
    <div>
      <Header />

      <div className="movie-card">
        <div className="movie-card-bg">
          <div className="color-movie-card">
            <div className="movie-card-content">
              <img src={avt} alt="" className="avtMovie" />
              <div className="infor-card">
                <span className="movie-title">{movieTitle}</span>
                <span className="movie-subtitle">2D</span>
                <span className="movie-details">
                  <span className="bold">Hài</span> | <span>Hàn Quốc</span> |{" "}
                  <span>113 phút</span> |{" "}
                  <span>Đạo diễn: {movie?.director}</span>
                </span>
                <span className="movie-cast">Diễn viên: {movieCast}</span>
                <span className="movie-release-date">Đang Công Chiếu</span>
                <span className="movie-description">{movieDescription}</span>
                <a href="#" className="action-link">
                  Kiểm duyệt: T13 - PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ 13 TUỔI
                  TRỞ LÊN (13+)
                </a>
                <div className="movie-actions">
                  <a href="#" className="more-infor">
                    Chi tiết nội dung
                  </a>
                  <a href="#" className="trailer">
                    Xem trailer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="list-time-screen">
        <div className="time-screen">
          <span className="month">Th.11</span>
          <span className="day-text">14</span>
          <span className="day-number">Thứ 4</span>
        </div>
        <div className="time-screen">
          <span className="month">Th.11</span>
          <span className="day-text">13</span>
          <span className="day-number">Thứ 5</span>
        </div>
      </div>

      <div className="choose-time-screen">
        <div className="note">
          <p>
            <span>Lưu ý: </span>
            Khán giả dưới 13 tuổi vui lòng chọn suất chiếu kết thúc trước 22
            giờ, và khán giả dưới 16 tuổi vui lòng chọn suất chiếu kết thúc
            trước 23 giờ.
          </p>
        </div>
        <div className="list-start-screen">
          {showtimes.map((st) => (
            <span
              key={st.id}
              onClick={() => handleTimeClick(st.startTime)}
              className="time-span"
            >
              {st.startTime}
            </span>
          ))}
        </div>
      </div>

      {selectedTime && (
        <div className="seat-selection">
          <div className="infor-time">
            <span>Giờ chiếu: {selectedTime}</span>
            <p>Thời gian chọn ghế đến: {SelectedTimeToSelect}</p>
          </div>
          <img src={screen} alt="" />
          <p className="class-show-movie">Phòng chiếu số {screenId}</p>

          <div className="seat-map">
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((row) => (
              <div key={row} className="seat-row">
                {Array.from({ length: 15 }, (_, index) => {
                  const seat = `${row}${index + 1}`;
                  const type = seatTypeMap.get(seat) || "normal";

                  const isBooked = bookedSeats.includes(seat);
                  const isSelected = selectedSeats.includes(seat);

                  return (
                    <span
                      key={seat}
                      onClick={() => handleSeatClick(seat)}
                      className={`seat ${
                        isBooked
                          ? "seat-booked"
                          : isSelected
                          ? "seat-user-selected"
                          : type === "normal"
                          ? "seat-classic"
                          : "seat-vip"
                      }`}
                    >
                      {seat}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="infor-seat">
            <div className="seat-close">
              <span>x</span>
              <p>Đã đặt</p>
            </div>
            <div className="seat-your-choose">
              <span></span>
              <p>Ghế Bạn Chọn</p>
            </div>
            <div className="seat-classic">
              <span></span>
              <p>Ghế Thường</p>
            </div>
            <div className="seat-vip">
              <span></span>
              <p>Ghế Vip</p>
            </div>
          </div>

          <div className="confirm-seat">
            <div className="sum-price">
              <p>Ghế đã chọn: {selectedSeats.join(", ")}</p>
              <div className="price">
                <p>Tổng tiền:</p>
                <span>{totalPrice.toLocaleString("vi-VN")} Đ</span>
              </div>
            </div>
            <div className="confirm-seat-buttons">
              <button className="back" onClick={handleBack}>
                Quay lại
              </button>
              <button onClick={handlePayment} className="payment">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div className="footer">
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
      </div> */}
      <Footer />
    </div>
  );
}
