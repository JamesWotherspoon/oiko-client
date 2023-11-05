import { StyledCard, StyledCardHeader, HorizontalFlexBox } from '../../styles/SharedStyles';
import { createContext, useContext, useState, useEffect } from 'react';
import { useCategoryApi } from '../../utils/apiHooks';
import CategoryUnit from './CategoryUnit';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // Set isRequestPending to true
  const { data, error, isRequestPending, sendRequest } = useCategoryApi(true);

  useEffect(() => {
    sendRequest('get')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [sendRequest]);

  return (
    <>
      {isRequestPending ? (
        'Loading...'
      ) : (
        <>
          <HorizontalFlexBox>
            (
            {categories.map((category) => (
              <CategoryUnit key={category.id} />
            ))}
            )
          </HorizontalFlexBox>
        </>
      )}
    </>
  );
};

export default Categories;
