import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledHeader = styled(Box)(({}) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
    padding: '0 40px',
    backgroundColor: 'white',
    marginBottom: '24px',
    borderBottom: '1px solid lightgrey',
}));
