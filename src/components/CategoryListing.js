import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import OptionsSelect from '../sharedComponents/OptionsSelect';
import EmptyDataInfo from '../sharedComponents/EmptyDataInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectMoneyPot } from '../utils/slices';
import { selectCategory } from '../utils/slices';
import CategoryUnit from '../sharedComponents/CategoryUnit';

const CategoryListing = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.items);

  const handleItemSelect = (itemData) => {
    dispatch(selectCategory(itemData));
    if (location.pathname !== '/categories') {
      navigate('/categories');
    }
  };

  return (
    <>
      {categories.length === 0 ? (
        <EmptyDataInfo label="categories" />
      ) : (
        <div className="data-listing-cont category-listing">
        {categories.map((category) => {
          return (
            <CategoryUnit key={category.id} category={category} onCategoryClick={handleItemSelect} />
          );
        })}
      </div>
      )}
    </>
  );
};

export default CategoryListing;
