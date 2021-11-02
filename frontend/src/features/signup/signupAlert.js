import React from 'react';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Signup.module.css'

export function SignupAlert({ alert, close }) {

  return (
    <Collapse in={alert.open} className={styles.alert}>
    <Alert
      severity="warning"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            close()
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      { alert.text }
    </Alert>
    </Collapse>
  )
}