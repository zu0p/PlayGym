import React, { useState } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export function Login() {
  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')
  const handleIdChange=(e)=>{
    setId(e.target.value)
  }
  const handlePwdChange=(e)=>{
    setPwd(e.target.value)
  }
  const validation=()=>{

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
        error={validation}
        helperText={validation?"text":""}
        id="outlined-required"
        label="PW"
        type="password"
        onChange={handlePwdChange}
      />
      <Button><Link to="/home">go home</Link></Button>
    </div>
  );
}