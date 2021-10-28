import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid'
import { FullDialogBar, FullDialogGrid } from './customProfileStyle'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditMainUserInfoDialog(props) {

  const handleClose = () => {
    props.getClose(true)
  }

  const onEditClick = () => {

  }

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <FullDialogBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              My page
            </Typography>
            <Button autoFocus color="inherit" onClick={onEditClick}>
              edit
            </Button>
          </Toolbar>
        </FullDialogBar>
        <FullDialogGrid
          container
          fullScreen
        >
          <Grid item>
            info
          </Grid>
        </FullDialogGrid>
      </Dialog>
    </div>
  );
}