import { Col, Row } from "antd";
import moviecard from "../img/Bannernew.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";

function NewProduct() {
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
  ];
  return (
    <div className="movie-container">
      <div className="mb-[26px] flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Tin Tức</h1>
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
        <div className="mb-[16px] flex justify-between items-center">
          <div className="gap-[8px] flex items-center">
            <p className=""></p>
            <p className="title-movie-col-right"></p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              Tiếp theo
            </button>
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              Xem tất cả
            </button>
          </div>
        </div>
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

export default NewProduct;
