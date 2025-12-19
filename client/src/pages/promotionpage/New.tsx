import { Col, Row } from "antd";
import AppHeader from "../../components/Header";
import Footer from "../../components/Footer";
import Product from "../../components/NewProduct";
export default function Promotionhome() {
  return (
    <div>
      <div>
        <AppHeader />
      </div>
      <div className="mt-[32px] mb-[32px] sm:mt-[51px] sm:mb-[51px] md:mt-[68px] md:mb-[68px] container max-w-[1480px] mx-auto px-[16px] md:px-[0]">
        <Row gutter={24}>
          <Col lg={28} md={24}>
            <div className="mb-[80px]">
              <Product />
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
