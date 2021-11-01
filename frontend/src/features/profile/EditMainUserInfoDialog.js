import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { requestUnsignupUser, requestUpdateUser } from '../../app/actions/userActions'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditMainUserInfoDialog(props) {
  const dispatch = useDispatch()
  const userState = useSelector(state=>state.user)

  const [inputDisable, setInputDisable] = useState(true)

  const [userId, setUserId] = useState(userState.mainUser.userId)
  const [name, setName] = useState(userState.mainUser.name)
  const [email, setEmail] = useState(userState.mainUser.email)
  const [phone, setPhone] = useState(userState.mainUser.phone)

  const handleClose = () => {
    props.getClose(true)
  }

  const onEditClick = () => {
    if(inputDisable){
      console.log('before')
      setInputDisable(false)
      console.log(document.getElementById('editButton'))
      const eButton = document.getElementById('editButton')
      eButton.style.backgroundColor='#7DA3D4'
      eButton.innerText='save'

      const oButton = document.getElementById('outButton')
      oButton.style.display = 'block'
      oButton.style.backgroundColor = '#AC3943'
      oButton.style.marginRight = '10px'
    }
    else{
      console.log('save')
      setInputDisable(true)

      // action: modify main user info
      let userInfo = {
        id: userState.mainUser.id,
        email: email,
        name: name,
        phone: phone,
        password: "ssafyssafy123~"
      }
      dispatch(
        requestUpdateUser(userInfo)
      )
      // close dialog
    }
  }

  const onOutClick = () => {
    console.log('회원탈퇴')
    // action: unsign up
    // console.log(userState.mainUser.id)
    dispatch(
      requestUnsignupUser(userState.mainUser.id)
    )
    // close dialog
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeUserId = (e) => {
    setUserId(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePhone = (e) => {
    setPhone(e.target.value)
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
            <Button color="inherit" onClick={onOutClick} id="outButton" style={{display:'none'}}>
              회원탈퇴
            </Button>
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
          <Grid item mt={10}>
            <h5>Name</h5>
            <AddTextField 
              disabled={inputDisable} 
              style={{width:'300px'}} 
              value={name}
              onChange={handleChangeName}
            />
          </Grid>
          <Grid item mt={2}>
            <h5>ID</h5>
            <AddTextField 
              disabled={true} 
              style={{width:'300px'}} 
              value={userId}
              onChange={handleChangeUserId}
            />
          </Grid>
          <Grid item mt={2}>
            <h5>E-mail</h5>
            <AddTextField 
              disabled={inputDisable} 
              style={{width:'300px'}} 
              value={email}
              onChange={handleChangeEmail}
            />
          </Grid>
          <Grid item mt={2}>
            <h5>Phone</h5>
            <AddTextField 
              disabled={inputDisable} 
              style={{width:'300px'}} 
              value={phone}
              onChange={handleChangePhone}
            />
          </Grid>
        </FullDialogGrid>
      </Dialog>
    </div>
  );
}