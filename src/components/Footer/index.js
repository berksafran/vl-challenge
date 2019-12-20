import React from "react";
import { Jumbotron, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <Jumbotron className="m-0">
      <Container className="d-flex justify-content-end">
        <Row>
        <strong> {t('footerText.label')} </strong>
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default Footer;
