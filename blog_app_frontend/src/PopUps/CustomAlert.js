import React, {useState, useEffect} from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({ severity, title, message, onClose, autoHideDuration = 2000 }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let timer;
    if (open && autoHideDuration) {
      timer = setTimeout(() => {
        setOpen(false);
        if (onClose) {
          onClose();
        }
      }, autoHideDuration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [open, autoHideDuration, onClose]);

  const handleAlertClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };
 
  return (
    <>
      {open && (
        <Alert severity={severity} onClose={handleAlertClose} sx={{ mb: 2, mt: 3 }}>
          <AlertTitle>{title}</AlertTitle>
          {message}
          {onClose ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleAlertClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : null}
        </Alert>
      )}
    </>
  );
};

export default CustomAlert;
