import React from 'react';
import { useSelector } from 'react-redux';
import CategoryUnit from './CategoryUnit';
import FormError from './FormError';

export default function CategoryUnitSelect({ cateoryId, handleCategoryIdChange, error }) {
  const categories = useSelector((state) => state.category.items);
  const handleCategorySelection = (id) => {
    if(id === cateoryId) {
      handleCategoryIdChange(null);
      return;
    }
    handleCategoryIdChange(id);
  }

  return (
    <fieldset>
      <h5 className="form-sub-heading">
        Category <span className="info-text">(optional)</span>
      </h5>
      <div className="category-btn-cont">
        {categories.map((category) => (
          <CategoryUnit
            key={category.id}
            category={category}
            handleClick={handleCategorySelection}
            selectedItem={cateoryId}
          />
        ))}
      </div>
      <FormError errorMessage={error} />
    </fieldset>
  );
}
