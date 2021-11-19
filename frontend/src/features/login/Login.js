import React, { useEffect, useState } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestLoginUser, requestGetChildren } from '../../app/actions/userActions';
import logo from '../../images/play_gym_logo.png';
import cloudImage from '../../images/background_cloud.png'
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Login.module.css';
import {SubmitButton, LoginTextField, SmallButton} from './styledComponent';
import { Background } from '../background/Background';


export function Login(props) {
  const dispatch = useDispatch()
  const userState = useSelector(state=>state.user)

  const [id, setId] = useState('')
  const [idError, setIdError] = useState('')
  const [clickedId, setClickedId] = useState(false)
  
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [clickedPw, setClickedPw] = useState(false)

  const [buttonDisable, setButtonDisable] = useState(true)
  const [idAlertOpen, setIdAlertOpen] = useState(false)
  const [pwdAlertOpen, setPwdAlertOpen] = useState(false)

  useEffect(()=>{
    if(clickedId && clickedPw && idError=='' && pwError == ''){
      setButtonDisable(false)
    }
    else{
      setButtonDisable(true)
    }
  },[idError, pwError])

  const handleIdChange = (e) => {
    setId(e.target.value)

    if (e.target.value === '') {
      setIdError('ID는 필수 항목입니다.')
    } else if (e.target.value.length < 6 || e.target.value.length > 16) {
      setIdError('ID는 6~16자 사이로 입력해 주세요.')
    } else {
      // need to find regex to catch spacebars in id
      setIdError('')
    }
  }

  const idValidation = () => {
    if (clickedId) {
      if (id === '') 
        return true
      if (id.length < 6 || id.length > 16) 
        return true
    }
    return false
  }

  const handlePwChange = (e) => {
    setPw(e.target.value)

    if (e.target.value.length < 8 || e.target.value.length > 16) {
      setPwError('비밀번호는 8~16자 사이로 입력해 주세요.')
      return
    }
    
    const eng = e.target.value.search(/[a-zA-Z]/g)
    const num = e.target.value.search(/[0-9]/gi)
    const spec = e.target.value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
    
    if (num < 0 || eng < 0 || spec < 0) {
      setPwError('영문, 숫자, 특수문자를 포함해 주세요.')
      return
    }
    setPwError('')
  }

  const pwValidation = () => {
    if (clickedPw) {
      if (pw.length < 8 || pw.length>16)
        return true
      
      const eng = pw.search(/[a-zA-Z]/g)
      const num = pw.search(/[0-9]/gi)
      const spec = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
      if (num < 0 || eng < 0 || spec < 0)
        return true
  
      return false
    }
  }

  const onloginClick=()=>{
    // 로그인 수행 후 홈페이지로 이동
    let param = {
      'userid': id,
      'password': pw
    }

    dispatch(
      requestLoginUser(param)
    ).then(res=>{
        // 1. check auth and save user info at state
        // console.log(res.payload)
        if(res.payload == 401){
          // incorrect password
          // console.log('401')          
          setPwdAlertOpen(true)
        }
        else if(res.payload == 500){
          // does not exist user id
          setIdAlertOpen(true)
        }
        else{
          // console.log(res.payload.data.result)
          // console.log(userState)

          // 2. save token, main-user key into localStorage
          localStorage.setItem('access-token', res.payload.data.result.token)
          localStorage.setItem('main-user', res.payload.data.result.id)
          // console.log(localStorage.getItem('access-token'))

          dispatch(requestGetChildren(localStorage.getItem('main-user')))
            .then(()=>{
              // 3. go to 'select player' page
              props.history.push('/profile')

            })
        }
      
    })
    .catch(err=>{
      console.log(err)
      // if(err.response.status==401){
      //   // incorrect password
      //   setPwdAlertOpen(true)
      // }
      // else{
      //   // does not exist user id
      //   setIdAlertOpen(true)
      // }
    })
  }

  return (
    <div className={styles.login_container} >
      <Collapse in={idAlertOpen} className={styles.idAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIdAlertOpen(false);
                setId('')
                setPw('')
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          존재하지 않는 아이디입니다.
        </Alert>
      </Collapse>

      <Collapse in={pwdAlertOpen} className={styles.idAlert}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setPwdAlertOpen(false);
                setPw('')
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          비밀번호가 틀렸습니다.
        </Alert>
      </Collapse>
      <Background />
      {/* <h1>{ id }, { pw }</h1> */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item mt={"10%"} mb={'30px'}>
          <img src={logo} width="150"/>
        </Grid>
        <Grid item mb={'35px'}>
          <LoginTextField
            required
            error={ idValidation() }
            helperText={ idError }
            id="outlined-required"
            label="ID"
            onFocus={ () => { if (!clickedId) { setIdError('ID는 필수 항목입니다.'); setClickedId(true); } } }
            onChange={ handleIdChange }
          />
        </Grid>
        <Grid item mb={'35px'}>
          <LoginTextField
            required
            error={ pwValidation() }
            helperText={ pwError }
            id="outlined-required"
            label="PW"
            type="password"
            onFocus={ () => { if (!clickedPw) { setPwError('비밀번호는 필수 항목입니다.'); setClickedPw(true); } } }
            onChange={ handlePwChange }
          />
        </Grid>
        <Grid item mb={'35px'}>
          <SubmitButton 
            variant="outlined" 
            size="large"
            onClick={onloginClick}
            disabled={buttonDisable}
          >
            LogIn
          </SubmitButton>
        </Grid>

        <Grid item>
          <Link to="signup" style={{ textDecoration: 'none' }}>
            <SmallButton>sign up</SmallButton>
          </Link>
          <SmallButton>Forget password?</SmallButton>
        </Grid>
      </Grid>
    </div>
  );
}
