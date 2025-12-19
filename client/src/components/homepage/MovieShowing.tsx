import { Col, Row } from "antd";
import moviecard from "../../img/bannerhome.png";
import "../../css/index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";

function MovieShowing() {
  const data = [
    {
      id: 1,
      img: moviecard,
      type: "Hài",
      date: "15.11.2024",
      name: "Cười Xuyên Biên Giới",
    },
    {
      id: 2,
      img: moviecard,
      type: "Hài",
      date: "15.11.2024",
      name: "Hài Bờ Biển",
    },
    {
      id: 3,
      img: moviecard,
      type: "Hành động",
      date: "20.11.2024",
      name: "Truy Kích",
    },
    {
      id: 4,
      img: moviecard,
      type: "Tâm lý",
      date: "25.11.2024",
      name: "Bến Đỗ",
    },
    {
      id: 5,
      img: moviecard,
      type: "Phiêu lưu",
      date: "30.11.2024",
      name: "Đảo Xanh",
    },
    {
      id: 6,
      img: moviecard,
      type: "Hài",
      date: "05.12.2024",
      name: "Cười Lên Nào",
    },
    {
      id: 7,
      img: moviecard,
      type: "Hành động",
      date: "10.12.2024",
      name: "Bão Đêm",
    },
    {
      id: 8,
      img: moviecard,
      type: "Tình cảm",
      date: "15.12.2024",
      name: "Yêu Xa",
    },
    {
      id: 9,
      img: moviecard,
      type: "Hài",
      date: "20.12.2024",
      name: "Hội Quậy",
    },
    {
      id: 10,
      img: moviecard,
      type: "Tâm lý",
      date: "25.12.2024",
      name: "Mùa Đông",
    },
    {
      id: 11,
      img: moviecard,
      type: "Phiêu lưu",
      date: "30.12.2024",
      name: "Hành Trình",
    },
    {
      id: 12,
      img: moviecard,
      type: "Hành động",
      date: "04.01.2025",
      name: "Nhiệm Vụ",
    },
    {
      id: 13,
      img: moviecard,
      type: "Hài",
      date: "09.01.2025",
      name: "Cười Nữa Đi",
    },
    {
      id: 14,
      img: moviecard,
      type: "Tình cảm",
      date: "14.01.2025",
      name: "Chờ Anh",
    },
    {
      id: 15,
      img: moviecard,
      type: "Hành động",
      date: "19.01.2025",
      name: "Biệt Đội",
    },
    {
      id: 16,
      img: moviecard,
      type: "Phiêu lưu",
      date: "24.01.2025",
      name: "Thám Hiểm",
    },
  ];
  return (
    <div className="movie-container">
      <div className="mb-[16px] flex justify-between items-center">
        <div className="gap-[8px] flex items-center">
          <p className="icon-red"></p>
          <p className="title-movie-col-right">Phim đang chiếu</p>
        </div>
        <p className="view-all-movieshowing">Xem tất cả</p>
      </div>

      <div className="cards-movie cards-desktop">
        <Row gutter={[24, 24]}>
          {data.map((item) => (
            <Col key={item.id} span={6}>
              <div className="movie-card">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full rounded-lg mb-3"
                />
                <div className="flex gap-[20px] items-center mt-[12px] text-type-date-mv">
                  <p>{item.type}</p>
                  <p>{item.date}</p>
                </div>
                <p className="mt-[8px] name-movie">{item.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className="cards-mobile">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView={3.2}
          spaceBetween={-99}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1.4,
            slideShadows: false,
          }}
          modules={[EffectCoverflow]}
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className="w-[240px]">
              <img
                src={item.img}
                alt={item.name}
                className="w-full rounded-2xl mb-3"
              />
              <p className="text-center mt-[8px] text-[14px]">{item.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieShowing;
