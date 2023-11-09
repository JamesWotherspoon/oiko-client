import React, { useState } from 'react';
import { HorizontalFlexBox } from '../styles/SharedStyles';
import { StyledCard, StyledCardHeader } from '../styles/SharedStyles';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomModal from './CustomModal';

export default function ItemCard({ title, children, modalContent, addItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal  = () => {
    setIsModalOpen(true)
    addItem()
  }
  return (
    <>
      <StyledCard>
        <HorizontalFlexBox>
          <h3>{title}</h3>

          {modalContent && (
            <IconButton onClick={openModal}>
              <AddCircleOutlineIcon />
            </IconButton>
          )}
        </HorizontalFlexBox>
        {children}
      </StyledCard>
      {isModalOpen && (
        <CustomModal title={title} onClose={() => setIsModalOpen(false)}>
          {modalContent}
        </CustomModal>
      )}
    </>
  );
}
