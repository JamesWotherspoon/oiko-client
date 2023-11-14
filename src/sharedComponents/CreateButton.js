import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreateButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <AddCircleOutlineIcon />
    </IconButton>
  );
};

export default CreateButton;
