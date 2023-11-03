import { styled } from '@mui/system';
import { Drawer, ListItem, ListItemButton, Avatar, Box, IconButton } from '@mui/material';

export const StyledDrawer = styled(Drawer)(({ open }) => ({
  width: open ? '240px' : '104px',
  transition: 'width 0.2s ease-out',
  overflowX: 'hidden',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: open ? '240px' : '104px',
    transition: 'width 0.2s ease-out',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  },
}));

export const StyledListItem = styled(ListItem)(({theme}) => ({
  padding: '0',
  color: 'grey',
  '& .MuiSvgIcon-root': {
    fontSize: 32,
    textAlign: 'center',
    margin: '0 16px 0 36px',
    padding: 0,
    color: theme.palette.brand.main,
  },
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  padding: '8px 0px',
  '& .MuiSvgIcon-root, & .MuiListItemText-root': {
    color: ( selected ? theme.palette.secondary.main : null ),
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  background: theme.palette.brand.main,
  margin: '0 16px 0 32px',
  // ... other styles
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '32px 0',
  '& .user-name': {
    margin: 0,
    color: theme.palette.grey.main,
  },
}));

export const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: 0,
  margin: '3px',
  width: '24px',
  height: '24px',
}));