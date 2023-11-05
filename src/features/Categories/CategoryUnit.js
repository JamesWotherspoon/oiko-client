import { StyledCategoryButton } from './CategoryStyles';

const CategoryUnit = ({ category }) => {
  const { name, categoryColor = 'hsl(164,48%,60%)', id } = category;

  return (
    <StyledCategoryButton
      to={`/categories/${id}`}
      color={categoryColor}
    >
      <h5>{name}</h5>
    </StyledCategoryButton>
  );
};

export default CategoryUnit;
