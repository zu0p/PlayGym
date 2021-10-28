import React, { useEffect, useState } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestLoginUser } from '../../app/actions/userActions';
import logo from '../../images/play_gym_logo.png';
import cloudImage from '../../images/background_cloud.png'
import Grid from '@mui/material/Grid';
import styles from './Login.module.css';
import {SubmitButton, LoginTextField, BackAnimation, SmallButton} from './styledComponent';
import { motion } from "framer-motion"

export function Login() {
  const dispatch = useDispatch()

  const [id, setId] = useState('')
  const [idError, setIdError] = useState('')
  const [clickedId, setClickedId] = useState(false)
  
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [clickedPw, setClickedPw] = useState(false)

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

  // to properly log state hook data, refer Notion: setState is asynchronous.
  // useEffect(() => {
  //   console.log('id:', id)
  //   console.log('pw:', pw)
  // }, [id, pw])

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
      userId: id,
      userPwd: pw
    }

    dispatch(
      requestLoginUser(param)
    )
  }

  return (
    <div className={styles.login_container} >

      <BackAnimation 
        animate={{ 
          scale: 2, 
          x:100, 
          y:100,
          position: 'fixed',
          top:'-100px',
          left:'-100px'
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={cloudImage} style={{width:'250px'}}/>
      </BackAnimation>
      <BackAnimation 
        animate={{ 
          scale: 2, 
          x:-200, 
          y:100,
          position: 'fixed',
          top:'-100px',
          left:'100%'
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={cloudImage} style={{width:'250px'}}/>
      </BackAnimation>
      <BackAnimation 
        animate={{ 
          scale: 2, 
          x:100, 
          y:-200,
          position: 'fixed',
          top:'100%',
          left:'-100px'
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={cloudImage} style={{width:'250px'}}/>
      </BackAnimation>
      <BackAnimation 
        animate={{ 
          scale: 2, 
          x:-250, 
          y:-200,
          position: 'fixed',
          top:'100%',
          left:'100%'
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={cloudImage} style={{width:'250px'}}/>
      </BackAnimation>
      {/* <h1>{ id }, { pw }</h1> */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item mt={"20%"} >
          <img src={logo} width="150"/>
        </Grid>
        <Grid item>
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
        <Grid item>
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
        <Grid item>
          <SubmitButton 
            variant="outlined" 
            size="large"
            onClick={onloginClick}
          >
            LogIn
          </SubmitButton>
        </Grid>

        <Grid item>
          <SmallButton>sign up</SmallButton>
          <SmallButton>Forget password?</SmallButton>
        </Grid>
      </Grid>
    </div>
  );
}
