import React, { useEffect, useState } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export function Login() {
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
  useEffect(() => {
    console.log('id:', id)
    console.log('pw:', pw)
  }, [id, pw])

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

  return (
    <div>
      <h1>PlayGym</h1>
      <h1>{ id }, { pw }</h1>
      <TextField
        required
        error={ idValidation() }
        helperText={ idError }
        id="outlined-required"
        label="ID"
        onFocus={ () => { if (!clickedId) { setIdError('ID는 필수 항목입니다.'); setClickedId(true); } } }
        onChange={ handleIdChange }
      />
      <TextField
        required
        error={ pwValidation() }
        helperText={ pwError }
        id="outlined-required"
        label="PW"
        type="password"
        onFocus={ () => { if (!clickedPw) { setPwError('비밀번호는 필수 항목입니다.'); setClickedPw(true); } } }
        onChange={ handlePwChange }
      />
      <Button><Link to="/home">go home</Link></Button>
    </div>
  );
}
