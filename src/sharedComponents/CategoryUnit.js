import React, { useEffect, useState } from 'react';

const CategoryUnit = ({ category, handleClick, selectedItem }) => {
  const { name, categoryColor = 'hsl(164,48%,60%)', id } = category;
  let selectedClass;

  if (selectedItem) {
    selectedClass = selectedItem === id ? 'selected' : 'not-selected';
  }

  return (
    <button className={`category-icon-btn ${selectedClass}`} type="button" onClick={() => handleClick(id)}>
      <h5>{name}</h5>
    </button>
  );
};

export default CategoryUnit;
