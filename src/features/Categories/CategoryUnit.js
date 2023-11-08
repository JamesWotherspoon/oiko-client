import React, { useState } from 'react';


const CategoryUnit = ({ category, handleClick }) => {
  const { name, categoryColor = 'hsl(164,48%,60%)', id } = category;

  return (
    <>

      <button className="category-icon-btn" onClick={() => handleClick(id)} color={categoryColor}>
        <h5>{name}</h5>
      </button>
    </>
  );
};

export default CategoryUnit;
