import { styled } from '@mui/system';
import { Box, Card } from '@mui/material';

export const HorizontalFlexBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: '24px',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
});

export const VerticalFlexBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
});

export const StyledCard = styled('div')(({minWidth}) => ({
    minWidth: minWidth, 
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexGrow: 1,
}));

export const StyledCardHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',   
    color:  'grey',
    fontSize: '16px',
    fontWeight: 'bold',
});