import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Badge from "../../components/Card";
import BarChart from "../../components/BarChart";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import "../../i18n";
import numeral from "numeral";
import "numeral/locales/tr";
import { socket } from "../../components/Socket";

export default function Home() {
  // Translation and Currency settings
  const { t } = useTranslation();
  numeral.locale("tr");

  // States
  const [balanceData, setBalanceData] = useState();
  const [topCategories, setTopCategories] = useState();
  const [topProducts, setTopProducts] = useState();
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  function fetchInitialData() {
    socket.emit("fetchData");
    socket.on("allData", (newTopProductsData, newBalanceData) => {
      setBalanceData(newBalanceData);
      setTopCategories(newBalanceData.top_categories);
      setTopProducts(newTopProductsData);
    });
  }

  // useEffect for fetching initial data and setting interval
  useEffect(() => {
    fetchInitialData();
    const fetchTimer = setInterval(() => {
      socket.emit("fetchData");
    }, 5000);
    return () => {
      clearInterval(fetchTimer);
      socket.off("allData");
    };
  }, []);

  // Control modal function
  const handleModal = () => setShow(!show);
  function selectedBestProduct(value) {
    setSelectedProduct(() => _.filter(topProducts, o => o.name === value));
    handleModal();
  }

  if (balanceData && topCategories && topProducts)
    return (
      <>
        <Container>
          <Row>
            {/* Total Amount Of Orders */}
            <Col className="p-10">
              <Badge
                title={t("totalAmountOfOrder.label")}
                bg="light"
                value={numeral(balanceData.total_order_count).format("0,0")}
              />
            </Col>
            {/* Total Endorsement */}
            <Col>
              <Badge
                title={t("totalEndorsement.label")}
                value={numeral(balanceData.total_endorsement).format("$0.0,")}
                bg="light"
              />
            </Col>
            {/* Total Profit */}
            <Col>
              <Badge
                title={t("totalProfit.label")}
                value={numeral(balanceData.total_profit).format("$0.0,")}
                bg="light"
              />
            </Col>
          </Row>
          <Row>
            {/* Top Ordered Categories */}
            <Col>
              <BarChart
                title={t("topOrderedCats.label")}
                value={_.map(topCategories, o => o.total_sold_products_count)}
                valueLabel={_.map(topCategories, o => o.name)}
                label={t("orderCount.label")}
              />
            </Col>
            {/* Top Seller Products */}
            <Col className="h-auto">
              <BarChart
                title={t("topSellerProducts.label")}
                value={_.map(topProducts, o => o.total_order_count)}
                valueLabel={_.map(topProducts, o => o.name)}
                label={t("orderCount.label")}
                bgColor="rgba(75,192,192,0.2)"
                hoverBgColor="rgba(75,192,192,0.4)"
                borderColor="rgb(75,192,192)"
                onClick={elems => selectedBestProduct(elems[0]._model.label)}
              />
              <div className="d-flex justify-content-center mb-2 font-italic text-secondary">
                <small>{t("clickGraphBar.label")}</small>
              </div>
            </Col>
          </Row>
          {/* Product city detail modal */}
          {selectedProduct && (
            <Modal show={show} onHide={handleModal}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedProduct[0].name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>{t("orderByCities.label")}</h5>
                <ul>
                  {_.map(selectedProduct[0].order_count_by_cities, o => (
                    <li>
                      {o.city_name} - {o.order_count}
                    </li>
                  ))}
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModal}>
                  {t('closeButton.label')}
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Container>
      </>
    );
  else return <Loading />;
}
