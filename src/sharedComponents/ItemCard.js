import React, { useState } from 'react';
import { HorizontalFlexBox } from '../styles/SharedStyles';
import { StyledCard, StyledCardHeader } from '../styles/SharedStyles';
import CustomModal from './CustomModal';
import CreateButton from './CreateButton';
import { NavLink } from 'react-router-dom';

export default function ItemCard({ title, children, addItem, link }) {
  return (
    <>
      <StyledCard>
        <HorizontalFlexBox>
          <h3>{title}</h3>
          {addItem && <CreateButton onClick={addItem} />}
          {link && (
            <NavLink to={link} className="item-card-link">
              See More
            </NavLink>
          )}
        </HorizontalFlexBox>
        {children}
      </StyledCard>
    </>
  );
}
