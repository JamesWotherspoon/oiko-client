import { StyledCard, StyledCardHeader, HorizontalFlexBox } from '../../styles/SharedStyles';
import { createContext, useContext, useState, useEffect } from 'react';
import { useCategoryApi } from '../../utils/apiHooks';
import CategoryUnit from './CategoryUnit';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { categorySlice } from '../../utils/slices';
import CategoryModalById from './EditCategory';
import CustomModal from '../../sharedComponents/CustomModal';

const Categories = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    category: undefined,
  });
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.items);
  const status = useSelector((state) => state.category.status);
  const error = useSelector((state) => state.category.error);

  const handleOpenModal = (id) => {
    console.log(categories);
    const category = categories.find((category) => category.id === id);
    console.log(category);
    setOpenModal({ isOpen: true, category });
  };
  const handleCloseModal = () => {
    setOpenModal({ isOpen: false, category: null });
  };
  console.log(openModal);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(categorySlice.fetchItems());
    }
  }, [status, dispatch]);

  return (
    <>
      {status === 'pending' ? (
        'Loading...'
      ) : (
        <>
          <div className="category-btn-cont">
            {categories.map((category) => (
              <CategoryUnit key={category.id} category={category} handleClick={handleOpenModal} />
            ))}
          </div>
          {openModal.isOpen &&
          <CustomModal title={`Edit Category`} onClose={handleCloseModal}>
            <CategoryModalById category={openModal.category} actionComplete={handleCloseModal} />
          </CustomModal>
          }
        </>
      )}
    </>
  );
};

export default Categories;
