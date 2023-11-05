import { styled } from '@mui/system';
import { FormControl, Select, Box } from '@mui/material';

export const StyledFormControl = styled(FormControl)(() => ({
  flexGrow: 1,
  minWidth: '30%',
  width: '30%',
  maxWidth: '30%',
}));

export const StyledSelect = styled(Select)(() => ({
  '&:focus div': {
    backgroundColor: 'transparent',
  },
  '& .MuiSelect-select': {
    backgroundColor: 'transparent',
  },
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

export const InputContainerBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: '0',
    justifyContent: 'space-between',
    width: '100%',
});