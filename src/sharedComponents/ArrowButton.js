import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreateButton = ({ onClick }) => {
  return (
    <button className="btn-outline small-btn" onClick={onClick}>
      Create
    </button>
  );
};

export default CreateButton;
