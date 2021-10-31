import React, { useEffect, useState } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../images/play_gym_logo.png';
import Grid from '@mui/material/Grid';
import styles from './Signup.module.css';
import { SubmitButton, SignupTextField } from './styledComponent';
import * as helperText from './signupHelperText'
import * as validators from './signupValidation';

export function Signup() {
  const dispatch = useDispatch()

  const defaultInputs = {
    EMAIL: '', ID: '', PW: '', NAME: '', PHONE: '',
  }
  const defaultFlags = {
    EMAIL: false, ID: false, PW: false, NAME: false, PHONE: false
  }
  const defaultTexts = {
    EMAIL: '', ID: '', PW: '', NAME: '', PHONE: ''
  }

  const [inputs, setInputs] = useState({...defaultInputs})
  const [clickFlags, setClickFlags] = useState({...defaultFlags})
  const [flags, setFlags] = useState({...defaultFlags})
  const [texts, setTexts] = useState({...defaultTexts})
  const [buttonActive, setButtonActive] = useState(false)
  
  const labels = {
    EMAIL: '이메일', 
    ID: '아이디', 
    PW: '비밀번호', 
    NAME: '이름', 
    PHONE: '전화번호'
  }
  const initialTexts = { 
    EMAIL: '이메일은 필수 항목입니다.',
    ID: '아이디는 필수 항목입니다.',
    PW: '비밀번호는 필수 항목입니다.',
    NAME: '이름은 필수 항목입니다.',
    PHONE: '전화번호는 필수 항목입니다.',
  }

  // activate button
  const activateButton = () => {
    console.log(Object.values(flags))
    for (let flag of Object.values(flags)) {
      if (flag === true) {
        setButtonActive(false)
        return
      }
    }
    for (let clickFlag of Object.values(clickFlags)) {
      if (!clickFlag) {
        setButtonActive(false)
        return
      }
    }
    setButtonActive(true)
  }
  

  // useEffect(() => {
  //   console.log(buttonActive)
  // }, [buttonActive])

  // const onloginClick=()=>{
    //   // 로그인 수행 후 홈페이지로 이동
    //   let param = {
      //     userId: id,
      //     userPwd: pw
      //   }
      //   // dispatch(
        //   //   requestLoginUser(param)
        //   // )
        // }
        
  return (
    <div className={styles.signup_container} >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
        <Grid item mt={"10%"} mb={'30px'}>
          <img src={logo} width="150" alt="" />
        </Grid>
        {Object.keys(inputs).map((input => (
          
          <Grid item key={input} mb={'35px'}>
            <SignupTextField
              type={ input === 'PW' ? 'password' : '' }
              key={input}
              required
              error={ flags[input] }
              helperText={ texts[input] }
              id="outlined-required"
              label={ labels[input] }
              // onChange={ handlers[i] }
              onFocus={() => { 
                if (!clickFlags[input]) { 
                  setClickFlags({ ...clickFlags, [input]: true });
                  setTexts({ ...texts, [input]: initialTexts[input] });
                  setFlags({ ...flags, [input]: true });
                }
              }}
              onChange={(e) => {
                setInputs({ ...inputs, [input]: e.target.value });
                setTexts({ ...texts, [input]: helperText[input](e.target.value) });
                setFlags({ ...flags, [input]: validators[input](clickFlags[input], e.target.value) });
                activateButton();
              }}
            />
          </Grid>
        )))}

        <Grid item>
          <SubmitButton 
            variant="outlined" 
            size="large"
            disabled={ !buttonActive }
            // onClick={onloginClick}
          >
            회원가입
          </SubmitButton>
        </Grid>
      </Grid>
    </div>
  );
}
