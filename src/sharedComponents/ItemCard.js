import React, { useState } from 'react';
import { HorizontalFlexBox } from '../styles/SharedStyles';
import { StyledCard, StyledCardHeader } from '../styles/SharedStyles';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomModal from './CustomModal';

export default function ItemCard({ title, children, modalContent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StyledCard>
        <HorizontalFlexBox>
          <h3>{title}</h3>

          {modalContent && (
            <IconButton onClick={() => setIsModalOpen(true)}>
              <AddCircleOutlineIcon />
            </IconButton>
          )}
        </HorizontalFlexBox>
        {children}
      </StyledCard>
      {isModalOpen && (
        <CustomModal onClose={() => setIsModalOpen(false)}>
          {React.cloneElement(modalContent, { actionComplete: () => setIsModalOpen(false) })}
        </CustomModal>
      )}
    </>
  );
}
