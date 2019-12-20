import React, {useState} from "react";
import {
  Nav,
  Navbar,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import {NavLink, withRouter} from 'react-router-dom'
import { useTranslation } from "react-i18next";
import "../../i18n";

function Header(props) {
    const [language, setLanguage] = useState("tr");
    const { t, i18n } = useTranslation();
    const changeLanguage = event => {
      i18n.changeLanguage(event);
      setLanguage(event);
    };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Navbar.Brand href="/">VL-Challenge</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-start"
      >
        <Nav className="mr-auto">
          <Nav.Link
            as={NavLink}
            exact
            href="/"
            to="/"
            active={props.location.pathname === "/"}
          >
            {t("generalStats.label")}
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            href="/categories"
            to="/categories"
            active={props.location.pathname === "/categories"}
          >
            {t("categories.label")}
          </Nav.Link>
        </Nav>
        <DropdownButton
          id="dropdown-basic-button"
          alignRight
          title={t("changeLanguage.label")}
          variant="outline-light"
          size="sm"
          className="mr-5"
        >
          <Dropdown.Item
            as="button"
            onClick={() => changeLanguage("tr")}
            active={language === "tr" ? true : false}
          >
            Turkish
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => changeLanguage("en")}
            active={language === "en" ? true : false}
          >
            English
          </Dropdown.Item>
        </DropdownButton>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(Header);
