import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledPageBox = styled(Box)(() => ({
    display: 'flex',
    width: '100%',
    height: '100vh',
}));

export const StyledContentBox = styled(Box)(() => ({
    position: 'relative',
    width: '100%',
    height: '100%',
}));