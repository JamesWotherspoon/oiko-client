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
  const [displayUnit, setDisplayUnit] = useState('graphs');
  const selectedCategory = useSelector((state) => state.selectItem.selectedCategory);
 
  useEffect(() => {
    if(selectedCategory.id){
      setDisplayUnit('editItem')
    }
  }, [selectedCategory])

  const handleAdd = (itemData) => {
    dispatch(categorySlice.addResources(itemData)).then(dispatchToastNotification);
    setDisplayUnit('graphs')
  };

  const handleUpdate = (data) => {
    dispatch(categorySlice.updateResource({ id: selectedCategory.id, data })).then(dispatchToastNotification);
    setDisplayUnit('graphs')
  };

  const handleDelete = (id) => {
    dispatch(categorySlice.deleteResource(id)).then(dispatchToastNotification);
    setDisplayUnit('graphs')
  };

  return (
    <div>
      <ItemCard className="category-panel" title="Categories" addItem={() => setDisplayUnit('addItem')}>
        <CategoryListing />
      </ItemCard>
      <div className="side-cont">
        {displayUnit === 'graphs' && (
          <div>
            <h5>Graphs</h5>
          </div>
        )}
      {displayUnit === 'addItem' && (
          <div className="form-cont">
            <h5 className="modal-title">Add Category</h5><CategoryForm onSubmit={handleAdd}>
            <button type="submit">Create</button>
          </CategoryForm>
        </div>
      )}
        {displayUnit === 'editItem' && (
        <EditCategory handleUpdate={handleUpdate} handleDelete={handleDelete} selectedCategory={selectedCategory} />
      )}
      </div>
    </div>
  );
}
