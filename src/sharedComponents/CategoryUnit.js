import React, { useEffect, useState } from 'react';

const CategoryUnit = ({ category, onCategoryClick, selectedCategoryId }) => {
  const { name, categoryColor = 'hsl(164,48%,60%)', id } = category;
  let selectedClass;

  if (selectedCategoryId) {
    selectedClass = selectedCategoryId === id ? 'selected' : 'not-selected';
  }

  return (
    <button className={`category-icon-btn ${selectedClass}`} type="button" onClick={() => onCategoryClick(category)} >
      <h5>{name}</h5>
    </button>
  );
};

export default CategoryUnit;
