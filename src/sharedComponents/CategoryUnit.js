import React, { useEffect, useState } from 'react';
import { categoryIconColorMapping } from '../utils/helpers';

const CategoryUnit = ({ category, onCategoryClick, selectedCategoryId }) => {
  let { name, color = 'hsl(164,48%,60%)', iconIdentifier, id } = category;
  const categoryItemDisplay = categoryIconColorMapping(iconIdentifier, color);
  let selectedClass;

  if (selectedCategoryId) {
    selectedClass = selectedCategoryId === id ? 'selected' : 'not-selected';
  }

  return (
    <div className='category-unit'>
      <div className={`category-icon-btn ${selectedClass}`} type="button" onClick={() => onCategoryClick(category)}>
        {categoryItemDisplay}
      </div>
      <h5>{name}</h5>
    </div>
  );
};

export default CategoryUnit;
