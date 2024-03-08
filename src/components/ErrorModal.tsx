import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

type ErrorModalProps = {
  open: boolean;
  errorMessage: string;
  onClose: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ open, errorMessage, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="error-dialog-title"
    aria-describedby="error-dialog-description"
  >
    <DialogTitle id="error-dialog-title">Lỗi</DialogTitle>
    <DialogContent>
      <DialogContentText id="error-dialog-description">{errorMessage}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Đóng
      </Button>
    </DialogActions>
  </Dialog>
);

export default ErrorModal;
