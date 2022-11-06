import { Snackbar } from '@material-ui/core';
import React from 'react'
import { CryptoState } from '../CryptoContext';
import MuiAlert from "@material-ui/lab/Alert";

const Alert = () => {

    const { Alert, setAlert } = CryptoState();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };
  

    return (
        <Snackbar
            open={Alert.open}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
        >
            <MuiAlert
                onClose={handleCloseAlert}
                elevation={10}
                variant="filled"
                severity={Alert.type}
            >
                {Alert.message}
            </MuiAlert>
        </Snackbar>

    )
}

export default Alert