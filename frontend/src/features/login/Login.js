import React, { useState } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export function Login() {
  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')
  const [errorText, setErrorText] = useState('')
  const handleIdChange=(e)=>{
    setId(e.target.value)
  }
  const handlePwdChange=(e)=>{
    const input = e.target.value
    setPwd(input)

    if(input.length<8 || input.length>16){
      setErrorText('8~16자 사이로 입력해 주세요')
      return
    }
    
    const eng = input.search(/[a-zA-Z]/g)
    const num = input.search(/[0-9]/gi)
    const spec = input.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
    if(num<0 || eng<0 || spec<0){
      setErrorText('영문, 숫자, 특수문자를 포함해 주세요')
      return
    }

    setErrorText('')
  }

  const validation=()=>{
    if(pwd.length<9 || pwd.length>16)
      return true
    
    const eng = pwd.search(/[a-zA-Z]/g)
    const num = pwd.search(/[0-9]/gi)
    const spec = pwd.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
    if(num<0 || eng<0 || spec<0)
      return true

    return false
  }

  return (
    <div>
      <h1>PlayGym</h1>
      <TextField
        focused
        required
        error={id===""?true:false}
        helperText={id===""?"아이디는 필수 입력값입니다.":""}
        id="outlined-required"
        label="ID"
        onChange={handleIdChange}
      />
      <TextField
        required
        error={validation()}
        helperText={errorText}
        id="outlined-required"
        label="PW"
        type="password"
        onChange={handlePwdChange}
      />
      <Button><Link to="/home">go home</Link></Button>
    </div>
  );
}