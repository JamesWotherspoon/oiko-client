import React, { useState, useEffect } from 'react';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { categorySlice } from '../utils/slices';
import CategoryForm from '../components/forms/CategoryForm';
import { useDispatchToastNotification } from '../utils/hooks';
import CategoryListing from '../components/CategoryListing';
import EditCategory from '../components/EditCategory';

export default function Categories() {
  const dispatch = useDispatch();
  const dispatchToastNotification = useDispatchToastNotification()
  // Handle retrieving category data
  const categories = useSelector((state) => state.category.items);
  const status = useSelector((state) => state.category.status);
  const error = useSelector((state) => state.category.error);
  const [displayUnit, setDisplayUnit] = useState('');
  const selectedCategory = useSelector((state) => state.selectItem.selectedCategory);
 
  useEffect(() => {
    if(selectedCategory.id){
      setDisplayUnit('editItem')
    }
  }, [selectedCategory])

  const handleAdd = (itemData) => {
    dispatch(categorySlice.addResources(itemData)).then(dispatchToastNotification);
    setDisplayUnit('addItem')
  };

  const handleUpdate = (data) => {
    dispatch(categorySlice.updateResource({ id: selectedCategory.id, data })).then(dispatchToastNotification);
    setDisplayUnit('addItem')
  };

  const handleDelete = (id) => {
    dispatch(categorySlice.deleteResource(id)).then(dispatchToastNotification);
    setDisplayUnit('addItem')
  };

  return (
    <main id="categories">
      <div className="content-header">
        <h1>Categories</h1>
        <p>
          Break your spending down into categories to better understand how to make your money go futher
          <br /> create a new category or edit the existing ones.
        </p>
        <button className='btn' >Create</button>
      </div>
      <div className="content">
        <CategoryListing />
  
      {displayUnit === 'addItem' && (
          <div className="form-cont">
            <h5 className="modal-title">Add Category</h5><CategoryForm onSubmit={handleAdd}>
            <button className='btn' type="submit">Create</button>
          </CategoryForm>
        </div>
      )}
        {displayUnit === 'editItem' && (
        <EditCategory handleUpdate={handleUpdate} handleDelete={handleDelete} selectedCategory={selectedCategory} />
      )}
      </div>
    </main>
  );
}
