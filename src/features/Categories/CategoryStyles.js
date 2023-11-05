import { styled } from '@mui/system';
import { Drawer, ListItem, ListItemButton, Avatar, Box, IconButton } from '@mui/material';

export const StyledCategoryButton = styled(IconButton)((categoryColor) => ({
  width: '72px',
  height: '72px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px solid ${categoryColor}`,
  color: categoryColor,
  fontSize: '14px',
  fontWeight: 'bold',
}));