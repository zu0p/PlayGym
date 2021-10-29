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
import { FullDialogBar, FullDialogGrid, AddTextField } from './customProfileStyle'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditMainUserInfoDialog(props) {
  const [inputDisable, setInputDisable] = React.useState(true)
  const handleClose = () => {
    props.getClose(true)
  }

  const onEditClick = () => {
    setInputDisable(false)
    console.log(document.getElementById('editButton'))
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
            <Button autoFocus color="inherit" onClick={onEditClick} id="editButton">
              edit
            </Button>
          </Toolbar>
        </FullDialogBar>
        <FullDialogGrid
          container
          direction="column"
          // justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          email id pwd name phone
          <Grid item mt={10}>
            <h5>Name</h5><AddTextField disabled={inputDisable} style={{width:'300px'}} value={'name'}/>
          </Grid>
          <Grid item mt={2}>
            <h5>ID</h5><AddTextField disabled={inputDisable} style={{width:'300px'}}/>
          </Grid>
          <Grid item mt={2}>
            <h5>E-mail</h5><AddTextField disabled={inputDisable} style={{width:'300px'}}/>
          </Grid>
          <Grid item mt={2}>
            <h5>Phone</h5><AddTextField disabled={inputDisable} style={{width:'300px'}}/>
          </Grid>
        </FullDialogGrid>
      </Dialog>
    </div>
  );
}