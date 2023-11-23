import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categorySlice } from '../utils/slices';
import CategoryForm from '../components/forms/CategoryForm';
import { useDispatchToastNotification } from '../utils/hooks';
import CategoryListing from '../components/CategoryListing';
import Modal from '../sharedComponents/Modal';
import { selectCategory } from '../utils/slices';

export default function Categories() {
  const dispatch = useDispatch();
  const dispatchToastNotification = useDispatchToastNotification();
  // Handle retrieving category data
  const categories = useSelector((state) => state.category.items);
  const status = useSelector((state) => state.category.status);
  const error = useSelector((state) => state.category.error);
  const [addItem, setAddItem] = useState(false);
  const selectedCategory = useSelector((state) => state.selectItem.selectedCategory);

  const handleAdd = (itemData) => {
    dispatch(categorySlice.addResources(itemData)).then(dispatchToastNotification);
    setAddItem(false);
  };

  const handleUpdate = (data) => {
    dispatch(categorySlice.updateResource({ id: selectedCategory.id, data })).then(dispatchToastNotification);
    dispatch(selectCategory({ id: null }))
  };

  const handleDelete = (id) => {
    dispatch(categorySlice.deleteResource(id)).then(dispatchToastNotification);
    dispatch(selectCategory({ id: null }))
  };

  return (
    <main id="categories">
      <div className="content-header">
        <h1>Categories</h1>
        <p>
          Break your spending down into categories to better understand how to make your money go futher
          <br /> create a new category or edit the existing ones.
        </p>
        <button className="btn" onClick={() => setAddItem(true)}>
          Create
        </button>
      </div>
      <div className="content">
        <CategoryListing />
        {addItem && (
          <Modal onClose={() => setAddItem(false)}>
            <CategoryForm onSubmit={handleAdd}>
              <button className="btn btn-large" type="submit">
                Add category
              </button>
            </CategoryForm>
          </Modal>
        )}
        {selectedCategory?.id && (
          <Modal onClose={() => dispatch(selectCategory({ id: null }))}>
            <CategoryForm onSubmit={handleUpdate} category={selectedCategory}>
              <button onClick={() => handleDelete(selectedCategory.id)} className="delete">
                Delete
              </button>
              <button type="submit">Update</button>
            </CategoryForm>
          </Modal>
        )}
      </div>
    </main>
  );
}
