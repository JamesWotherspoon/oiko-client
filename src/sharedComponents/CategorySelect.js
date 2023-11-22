import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import CategoryUnit from './CategoryUnit';
import FormError from './FormError';

export default function CategorySelect({ selectedCategoryId, handleCategoryIdChange, error }) {
  const categories = useSelector((state) => state.category.items);

  const handleCategorySelection = (category) => {
    if (category.id === selectedCategoryId) {
      handleCategoryIdChange(null);
      return;
    }

    handleCategoryIdChange(category.id);
  };

  return (
    <>
      <div className="category-select">
        {categories.map((category) => (
          <CategoryUnit
            key={category.id}
            category={category}
            onCategoryClick={handleCategorySelection}
            selectedCategoryId={selectedCategoryId}
          />
        ))}
      </div>
      <FormError errorMessage={error} />
    </>
  );
}
