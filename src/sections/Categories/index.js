import React, { useState } from "react";
import { Row, Container } from "react-bootstrap";
import CategoryNavBar from "../../components/CategoryNavBar";
import CategoryBody from "../../components/CategoryBody";

export default function Categories() {
  const [selectedCatID, setSelectedCatID] = useState();

  // Get selected category from <CategoryNavBar>
  function getSelectedCategoryName(category) {
    setSelectedCatID(category);
  }

  return (
    <Container>
      <Row className="d-flex m-0 pb-5 flex-column">
        <CategoryNavBar onGetSelectedCategoryName={getSelectedCategoryName} />
      </Row>
      <Row className="d-flex m-0 pb-5 flex-column">
        <CategoryBody selectedCategoryID={selectedCatID} />
      </Row>
    </Container>
  );
}
