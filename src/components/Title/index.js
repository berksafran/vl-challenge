import React from "react";
import { Jumbotron, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Title(props) {
  const { t } = useTranslation();

  return (
    <Jumbotron>
      <Container>
        <Row>
          <h1>
            {props.location.pathname === "/"
              ? t("generalStats.label")
              : props.location.pathname === "/categories"
              ? t("categories.label")
              : "Oooppps!"}
          </h1>
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default withRouter(Title);
