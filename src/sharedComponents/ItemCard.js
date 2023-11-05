import React from 'react';
import { HorizontalFlexBox } from '../styles/SharedStyles';
import { StyledCard, StyledCardHeader } from '../styles/SharedStyles';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function ItemCard({ title, children, minWidth, includeAddButton }) {
  return (
    <StyledCard minWidth={minWidth}>
      <HorizontalFlexBox>
        <StyledCardHeader>{title}</StyledCardHeader>
        {includeAddButton && 
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>}
      </HorizontalFlexBox>
      {children}
    </StyledCard>
  );
}
