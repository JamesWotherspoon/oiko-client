import React from 'react';
import { HorizontalFlexBox } from '../styles/SharedStyles';
import { StyledCard, StyledCardHeader } from '../styles/SharedStyles';

export default function ItemCard({ title, children, minWidth  }) {
  return (
    <StyledCard minWidth={minWidth}>
      <HorizontalFlexBox>
        <StyledCardHeader>{title}</StyledCardHeader>
      </HorizontalFlexBox>
      {children}
    </StyledCard>
  );
}
