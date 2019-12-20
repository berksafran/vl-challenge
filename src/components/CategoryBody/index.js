import React, { useState, useEffect } from "react";
import _ from "lodash";
import { socket } from "../Socket";
import { Row, Col } from "react-bootstrap";
import Badge from "../../components/Card";
import BarChart from "../../components/BarChart";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";
import "../../i18n";
import numeral from "numeral";
import "numeral/locales/tr";

function CategoryBody(props) {
  // Translation and Currency settings
  const { t } = useTranslation();
  numeral.locale("tr");

  // Selected category ID
  const { selectedCategoryID } = props;

  // States
  const [topCategories, setTopCategories] = useState();
  const [topProducts, setTopProducts] = useState();

  function fetchInitialData() {
    socket.emit("fetchData");
    socket.on("allData", (newTopProductsData, newBalanceData) => {
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

  if (!topCategories) return <Loading />;

  const selectedCat = topCategories[selectedCategoryID - 1];
  const selectedCatProducts = _.filter(
    topProducts,
    o => o.category_id === selectedCategoryID
  );

  return (
    <>
      <Row>
        {/* Total Amount Of Orders */}
        <Col className="p-10">
          <Badge
            title={t("cat_totalAmountOfOrder.label")}
            bg="light"
            value={numeral(selectedCat.total_order_count).format("0,0")}
          />
        </Col>
        {/* Total Endorsement */}
        <Col>
          <Badge
            title={t("cat_totalEndorsement.label")}
            value={numeral(selectedCat.endorsement).format("$0.0,")}
            bg="light"
          />
        </Col>
        {/* Total Profit */}
        <Col>
          <Badge
            title={t("cat_totalProfit.label")}
            value={numeral(selectedCat.profit).format("$0.0,")}
            bg="light"
          />
        </Col>
      </Row>
      <Row>
        {/* Total Visitor */}
        <Col className="mt-4">
          <Badge
            title={t("cat_totalVisitor.label")}
            value={numeral(selectedCat.total_visitor_count).format("0.0,")}
            bg="light"
          />
          <br />
          {/* Best Seller Products */}
          <Badge
            title={t("cat_bestSellerProducts.label")}
            value={selectedCatProducts}
            product={true}
            bg="light"
          />
        </Col>
        {/* Best Seller Products' Details */}
        <Col md={8}>
          <BarChart
            title={t("cat_catsInSameOrder.label")}
            value={_.map(
              selectedCat.categories_in_same_order,
              o => o.total_order_count
            )}
            valueLabel={_.map(
              selectedCat.categories_in_same_order,
              o => o.name
            )}
            label={t("orderCount.label")}
            bgColor="rgba(75,192,192,0.2)"
            hoverBgColor="rgba(75,192,192,0.4)"
            borderColor="rgb(75,192,192)"
          />
        </Col>
      </Row>
    </>
  );
}

export default CategoryBody;
