import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid'
import styles from './Profile.module.css'
import { FullDialogBar, FullDialogGrid, AddTextField, AddButton } from './customProfileStyle'
import { requestGetUser, requestUnsignupUser, requestUpdateUser, requestCheckPassword } from '../../app/actions/userActions'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditMainUserInfoDialog(props) {
  const dispatch = useDispatch()
  const userState = useSelector(state=>state.user)

  const [inputDisable, setInputDisable] = useState(true)

  const [userId, setUserId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // alert
  const [signout, setSignout] = useState(false)
  const [isCheckPwd, setIsCheckPwd] = useState(false)

  const [correctPwd, setCorrectPwd] = useState(false)

  useEffect(()=>{
    dispatch(requestGetUser(localStorage.getItem('main-user')))
      .then(res=>{
        // console.log(res)
        setUserId(res.payload.userid)
        setName(res.payload.name)
        setEmail(res.payload.email)
        setPhone(res.payload.phone)
      })
  },[])

  const handleClose = () => {
    props.getClose(true)
    setSignout(false)
    setInputDisable(true)
    setCorrectPwd(false)
    setIsCheckPwd(false)
  }

  const onEditClick = () => {
    if(inputDisable){
      // edit
      // console.log('before')
      setInputDisable(false)
      const eButton = document.getElementById('editButton')
      eButton.style.backgroundColor='#7DA3D4'
      eButton.innerText='save'

      const oButton = document.getElementById('outButton')
      oButton.style.display = 'block'
      oButton.style.backgroundColor = '#AC3943'
      oButton.style.marginRight = '10px'

      setPassword('')
      // console.log(password)
      const checkField = document.getElementById('check_password_field')
      checkField.classList.remove('fade_out')
      checkField.classList.add('fade_in')
      checkField.style.display = 'block'
      const passwordFeild = document.getElementById('new_password_field')
      passwordFeild.style.display = 'none'
    }
    else{
      // save(change info)
      if(!correctPwd){
        setIsCheckPwd(true)
        return
      }
      setInputDisable(true)
      const eButton = document.getElementById('editButton')
      eButton.style.backgroundColor='#A3C653'
      eButton.innerText='edit'

      const oButton = document.getElementById('outButton')
      oButton.style.display = 'none'
      // const passwordFeild = document.getElementById('new_password_field')
      // passwordFeild.style.display = 'none'

      // action: modify main user info
      
      let userInfo = {
        id: localStorage.getItem('main-user'),
        email: email,
        name: name,
        phone: phone,
        password: newPassword==''?password:newPassword
      }
      dispatch(
        requestUpdateUser(userInfo)
      )

      // close dialog
      handleClose()
    }
  }

  const checkPwd = () => {
    const param = {
      "userid" : userId,
      "password" : password
    }
    dispatch(requestCheckPassword(param))
      .then(res => {
        if(res.payload){
          // correct password
          setCorrectPwd(true)
          const checkField = document.getElementById('check_password_field')
          checkField.classList.add(styles.fade_out)
          checkField.style.display = 'none'

          const newField = document.getElementById('new_password_field')
          newField.style.display = 'block'
          newField.classList.add(styles.fade_in)
        }
        else{
          // incorrect password
          setCorrectPwd(false)
          const checkField = document.getElementById('check_password_field')
          // console.log(checkField.children)
          const children = checkField.children
          let isExist = false
          for(let i = 0; i<children.length; i++){
            if(children[i].id == 'helper_text'){
              isExist = true
            }
          }
          if(!isExist){
            const helperText = document.createElement('div')
            helperText.innerText = '비밀번호를 다시 확인해주세요'
            helperText.style.color = 'red'
            helperText.style.margin = '5px'
            helperText.id = 'helper_text'
            checkField.append(helperText)
          }
        }
      })
  }

  const onOutClick = () => {
    if(!correctPwd)
      // console.log(`ccc->${correctPwd}`)
      setIsCheckPwd(true)
    else setSignout(true)
  }

  const onSignout = () => {
    // console.log('회원탈퇴')
    // action: unsign up
    // console.log(userState.mainUser.id)
    dispatch(
      requestUnsignupUser(userState.mainUser.id)
    ).then(res=>{

      // back to login page
      localStorage.clear()
      window.location.href = '/'
    })
    
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

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value)

    const checkText = document.getElementById('check_new_password')
    if (e.target.value.length < 8 || e.target.value.length > 16) {
      checkText.innerText = '비밀번호는 8~16자 사이로 입력해 주세요.'
      return
    }
    
    const eng = e.target.value.search(/[a-zA-Z]/g)
    const num = e.target.value.search(/[0-9]/gi)
    const spec = e.target.value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
    
    if (num < 0 || eng < 0 || spec < 0) {
      checkText.innerText = '영문, 숫자, 특수문자를 포함해 주세요.'
      return
    }

    checkText.innerText = ''
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Collapse in={signout} >
          <Alert
            className={styles.outAlert}
            severity="error"
            action={
              <div>
              <Button onClick={onSignout} color="error">탈퇴</Button>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSignout(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              </div>
            }
            sx={{ mb: 2 }}
          >
            회원 탈퇴하시면 모든 정보가 삭제 됩니다. 정말로 회원 탈퇴하시겠습니까?
          </Alert>
        </Collapse>

        <Collapse in={isCheckPwd} >
          <Alert
            className={styles.outAlert}
            severity="warning"
            action={
              <div>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsCheckPwd(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              </div>
            }
            sx={{ mb: 2 }}
          >
            비밀번호를 확인해주세요
          </Alert>
        </Collapse>

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
              나의 정보
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
          // spacing={3}
        >
          <Grid item mt={2}>
            <h5>Name</h5>
            <AddTextField 
              disabled={inputDisable} 
              style={{width:'500px'}} 
              value={name}
              onChange={handleChangeName}
            />
          </Grid>
          <Grid item mt={2}>
            <h5>ID</h5>
            <AddTextField 
              disabled={true} 
              style={{width:'500px'}} 
              value={userId}
              onChange={handleChangeUserId}
            />
          </Grid>
          <Grid item mt={2}>
            <h5>E-mail</h5>
            <AddTextField 
              disabled={inputDisable} 
              style={{width:'500px'}} 
              value={email}
              onChange={handleChangeEmail}
            />
          </Grid>
          <Grid item mt={2}>
            <h5>Phone</h5>
            <AddTextField 
              disabled={inputDisable} 
              style={{width:'500px'}} 
              value={phone}
              onChange={handleChangePhone}
            />
          </Grid>
          <Grid id='check_password_field' item mt={2} style={{display: inputDisable?'none':'block'}}>
            <div>
            <h5>Old Password</h5>
            <AddTextField 
              style={{width:'400px'}} 
              placeholder={'기존 비밀번호를 입력하세요'}
              onChange={handleChangePassword}
              type='password'
            />
            <AddButton 
              onClick={checkPwd} 
              style={{width:'30px', margin: '0 0 0 30px'}}
            >
              확인
            </AddButton>
            </div>
          </Grid>
          <Grid id='new_password_field' item mt={2} style={{display:'none'}}>
            <div>
            <h5>New Password</h5>
            <AddTextField 
              style={{width:'500px'}} 
              placeholder={'새로운 비밀번호를 입력하세요'}
              onChange={handleChangeNewPassword}
              type='password'
            />
            </div>
            <div id="check_new_password" style={{color: 'red', margin:'5px'}}></div>
          </Grid>
        </FullDialogGrid>
      </Dialog>
    </div>
  );
}