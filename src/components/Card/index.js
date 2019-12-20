import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import "../../i18n";

const Badge = ({ title, subtitle, value, product, ...props }) => {
  const { t } = useTranslation();
  return (
    <Card
      {...props}
      className="m-3 justify-content-center"
      style={{ width: "18rem", ...props.style }}
    >
      <Card.Body>
        <Card.Title>
          <h5>{title}</h5>
        </Card.Title>
        {subtitle && (
          <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        )}
        <div>
          {_.isArray(value) ? (
            value.map(valueArray => (
              <div key={valueArray.id}>
                <Card.Text>
                  {valueArray.name}
                  {!product ? (
                    <p>{valueArray.total_sold_products_count}</p>
                  ) : null}
                </Card.Text>
                {product ? (
                  <div>
                    <h6> {t("cat_productPageview.label")} </h6>
                    <p>{valueArray.pageview_count}</p>
                    <h6> {t("cat_totalOrderCount.label")} </h6>
                    <p>{valueArray.total_order_count}</p>
                    <h6> {t("cat_productsInSameOrder.label")} </h6>
                    {_.map(valueArray.products_in_same_order, (o, index) => (
                      <p key={index}>
                        {o.name} - ({o.category_name})
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <Card.Text>{value}</Card.Text>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

Badge.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]).isRequired
};

export default Badge;
