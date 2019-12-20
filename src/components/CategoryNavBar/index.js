import React, { useEffect, useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import _ from "lodash";
import { socket } from "../Socket";

export default function CategoryNavBar({onGetSelectedCategoryName}) {
  // State hooks
  const [selectedCat, setSelectedCat] = useState(1);
  const [categories, setCategories] = useState();

  // Props to parent component
  function getSelectedCategoryName(value) {
    onGetSelectedCategoryName(value)
  }

  // Fetching categories name
  function fetchCats() {
    socket.emit("fetchCategories");
    socket.on("getCategories", response => {
      setCategories(response);
    });
  }

  useEffect(() => {
    fetchCats();
    getSelectedCategoryName(selectedCat)
    return () => {
      socket.off("getCategories");
      console.warn("Categories page was unmounted!");
    };
  }, []);

  return (
    <ToggleButtonGroup
      name="radio"
      defaultValue={selectedCat}
      onChange={value => {
        setSelectedCat(value);
        getSelectedCategoryName(value);
      }}
      className="mt-0"
    >
      {_.map(categories, category => (
        <ToggleButton
          type="radio"
          name="radio"
          variant="outline-info"
          value={category.id}
          key={category.id}
          className="mt-3"
        >
          {category.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
