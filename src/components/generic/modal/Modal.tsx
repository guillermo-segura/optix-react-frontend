import React from 'react';
import {
  Card,
  Modal as MaterialModal,
} from '@mui/material';

import { useScreenSize } from '../../../hooks/useScreenSize/useScreenSize';

const modalSx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  maxWidth: '100%',
  boxShadow: 24,
  p: 2,
};

export interface ModalProps {
  children: React.ReactElement;
  open: boolean;
  onClose: () => void;
}

export const Modal = ({ children, open, onClose }: ModalProps): JSX.Element => {
  const screenSize = useScreenSize();

  if (screenSize === 'sm') {
    return (
      <MaterialModal
        open={open}
        onClose={onClose}
      >
        <Card sx={modalSx}>
          {children}
        </Card>
      </MaterialModal>

    );
  }

  return (
    <Card sx={{ marginTop: '12px', padding: '6px' }}>
      {children}
    </Card>
  );
};
