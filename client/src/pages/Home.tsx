import banner from "../img/Herobanner (3).png";
import MovieComing from "../components/homepage/MovieComing";
import MovieShowing from "../components/homepage/MovieShowing";
import Promotion from "../components/homepage/Promotion";
import { Col, Row } from "antd";

function Home() {
  return (
    <section>
      <div className="w-full">
        <img src={banner} alt="Homepage banner" className="w-full rounded-lg" />
      </div>
      <div className="mt-[32px] mb-[32px] sm:mt-[51px] sm:mb-[51px] md:mt-[68px] md:mb-[68px] container max-w-[1280px] mx-auto px-[16px] md:px-[0]">
        <Row gutter={24}>
          <Col lg={18} md={24}>
            <div className="mb-[80px]">
              <MovieShowing />
            </div>
            <div>
              <MovieComing />
            </div>
          </Col>
          <Col lg={6} md={24}>
            <div>
              <Promotion />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Home;
