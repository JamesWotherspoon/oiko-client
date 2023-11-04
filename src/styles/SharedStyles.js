import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const HorizontalFillBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: '100%',
    margin: '32px 0',
    '& > *': {
        flex: 1,
        margin: '0 16px',
    },
});
