import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const MainLayoutStyle = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
}));

export const StyledContentContainer = styled(Box)(() => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    gap: '24px',
    padding: '0 40px',
}));