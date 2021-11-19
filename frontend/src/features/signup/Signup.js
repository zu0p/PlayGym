import React, { useEffect, useState } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../images/play_gym_logo.png';
import Grid from '@mui/material/Grid';
import styles from './Signup.module.css';
import { SubmitButton, SignupTextField, CheckButton } from './styledComponent';
import * as helperText from './signupHelperText'
import * as validators from './signupValidation';
import { requestSignupUser, requestIdConfirmUser } from '../../app/actions/userActions';
import { SignupAlert } from './signupAlert';

export function Signup(props) {
  const dispatch = useDispatch()

  const defaultInputs = {
    EMAIL: '', ID: '', PW: '', PWConfirm: '', NAME: '', PHONE: '',
  }
  const defaultFlags = {
    EMAIL: false, ID: false, PW: false, PWConfirm: false, NAME: false, PHONE: false
  }
  const defaultTexts = {
    EMAIL: '', ID: '', PW: '', PWConfirm: '', NAME: '', PHONE: ''
  }

  const [inputs, setInputs] = useState({ ...defaultInputs })
  const [clickFlags, setClickFlags] = useState({ ...defaultFlags })
  const [flags, setFlags] = useState({ ...defaultFlags })
  const [texts, setTexts] = useState({ ...defaultTexts })
  const [buttonActive, setButtonActive] = useState(false)
  const [alert, setAlert] = useState({ open: false, text: '' })
  
  const labels = {
    EMAIL: '이메일', 
    ID: '아이디', 
    PW: '비밀번호', 
    PWConfirm: '비밀번호 확인', 
    NAME: '이름', 
    PHONE: '전화번호'
  }
  const initialTexts = { 
    EMAIL: '이메일은 필수 항목입니다.',
    ID: '아이디는 필수 항목입니다.',
    PW: '비밀번호는 필수 항목입니다.',
    PWConfirm: '비밀번호를 다시 입력해 주세요.',
    NAME: '이름은 필수 항목입니다.',
    PHONE: '전화번호는 필수 항목입니다.',
  }

  useEffect(() => {
    for (let flag of Object.values(flags)) {
      if (flag === true) {
        setButtonActive(false)
        return
      }
    }
    if (inputs.EMAIL && inputs.ID && inputs.PW && inputs.PWConfirm && inputs.NAME && inputs.EMAIL)
      setButtonActive(true);
    else 
      setButtonActive(false);
  }, [flags])
  
  const onIdCheck = () => {
    // logic
    // id가 변경되면 다시 체크하도록
    // 이거 하면서 alert 달기
    const params = {
      id: inputs.ID,
    }
    dispatch(requestIdConfirmUser(params))
      .then(_ => {
        setFlags({ ...flags, ID: false })
        setTexts({ ...texts, ID: '사용 가능한 아이디입니다.' })
      })
      .catch(err => {
        if (err.response.status === 401)
          setTexts({ ...texts, ID: '이미 사용중인 아이디입니다.' });
        else {
          setAlert({open: true, text: '서버가 응답하지 않습니다. 잠시 후 다시 시도해 주세요.'})
          setTexts({ ...texts, ID: '' });
        }
      })
  }

  const onSignupClick = () => {
    const params = {
      email: inputs.EMAIL,
      userid: inputs.ID,
      password: inputs.PW,
      name: inputs.NAME,
      phone: inputs.PHONE,
    }
    dispatch(requestSignupUser(params))
      .then(_ => {
        // push to main(login page)
        props.history.push('/')
      })
      .catch(err => {
        setAlert({open: true, text: 'Something went wrong... try again'})
        console.log(err)
      })
  }

  const onCloseAlert = () => {
    setAlert({ open: false, text: ''})
  }
        
  return (
    <div className={styles.signup_container} >
      <SignupAlert alert={alert} close={onCloseAlert} />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
        <Grid item mt={"6%"} mb={'30px'}>
          <img src={logo} width="150" alt="" />
        </Grid>
        {Object.keys(inputs).map((input => (
          
          <Grid item key={input} mb={'35px'} container
            sx={{justifyContent: 'center', alignItems: 'center'}}
          >
            <SignupTextField
              type={ (input === 'PW') || (input === 'PWConfirm') ? 'password' : '' }
              key={input}
              required
              error={ flags[input] }
              helperText={ texts[input] }
              id="outlined-required"
              label={ labels[input] }
              sx={ 
                input === 'ID' ? { width: '200px' } :
                input === 'PWConfirm' ? { display: (clickFlags.PW && flags.PWConfirm) ? '' : 'none' } :
                {}
              }
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
                switch (input) {
                  case 'ID':
                    if (!validators[input](e.target.value)) {
                      setTexts({ ...texts, [input]: '중복 확인이 필요합니다.'});
                      setFlags({ ...flags, [input]: true });
                    } else
                      setTexts({ ...texts, [input]: helperText[input](e.target.value) });
                    break
                  case 'PW':
                    if (e.target.value === inputs.PWConfirm) {
                      setTexts({ ...texts, [input]: helperText[input](e.target.value), PWConfirm: '' });
                      setFlags({ ...flags, [input]: validators[input](e.target.value), PWConfirm: false });
                    } else {
                      setTexts({ ...texts, [input]: helperText[input](e.target.value), PWConfirm: '비밀번호를 다시 입력해 주세요.' });
                      setFlags({ ...flags, [input]: validators[input](e.target.value), PWConfirm: true });
                    }
                    break
                  case 'PWConfirm':
                    if (inputs.PW === e.target.value) {
                      setTexts({ ...texts, [input]: ''})
                      setFlags({ ...flags, [input]: false });
                    } else {
                      setTexts({ ...texts, [input]: '비밀번호를 다시 입력해 주세요.'})
                      setFlags({ ...flags, [input]: true });
                    }
                    break
                  default:
                    setTexts({ ...texts, [input]: helperText[input](e.target.value) });
                    setFlags({ ...flags, [input]: validators[input](e.target.value) });
                }

              }}
            />
            { input === 'ID' && (
              <CheckButton onClick={onIdCheck}>중복확인</CheckButton>
            )}
          </Grid>
        )))}

        <Grid item>
          <SubmitButton 
            variant="outlined" 
            size="large"
            disabled={ !buttonActive }
            onClick={onSignupClick}
          >
            회원가입
          </SubmitButton>
        </Grid>
      </Grid>
    </div>
  );
}
