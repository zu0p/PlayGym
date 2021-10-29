import * as React from 'react';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import styles from './Profile.module.css'
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { AddButton, CancelButton, AddTextField, SelectInput, SliderInput } from './customProfileStyle';
import { Grid, Select } from '@mui/material';

export default function AddProfileDialog(props) {
  const [tall, setTall] = useState(90)
  const [weight, setWeight] = useState(20)
  const [age, setAge] = useState(0)
  const [nickName, setNickName] = useState('')
  const [nickNameError, setNickNameError] = useState('')
  const [clickedNickName, setClickedNickName] = useState(false)
  
  const handleTallChange = (e, newTall) => {
    setTall(newTall)
  }

  const handelWeightChange = (e, newWeight) => {
    setWeight(newWeight)
  } 

  const handleAgeChange = (e) => {
    setAge(e.target.value)
  }

  const handleNickNameChange = (e) => {
    setNickName(e.target.value)

    if (e.target.value === '') {
      setNickNameError('닉네임은 필수 항목입니다.')
    } else if (e.target.value.length < 3 || e.target.value.length > 8) {
      setNickNameError('닉네임은 3~8자 사이로 입력해 주세요.')
    } else {
      // need to find regex to catch spacebars in id
      setNickNameError('')
    }
  }

  const nickNameValidation = () => {
    if (clickedNickName) {
      if (nickName === '') 
        return true
      if (nickName.length < 3 || nickName.length > 8) 
        return true
    }
    return false
  }

  const onClose = () => {
    props.getClose(true)
  }

  const onAdd = () => {
    // add sub proflie

    props.getClose(true)
  }

  return (
    <div>
      <Dialog open={props.open} tytleStyle={styles.dialog}>
        <DialogTitle><h1><AddReactionIcon fontSize="large"/> Add Player</h1></DialogTitle>
        <DialogContent style={{height: '430px', width: '400px'}}>
          <Grid container spacing={4} mt={'5px'}>
            <Grid item>
              <h5> Nickname </h5>
              <AddTextField 
                required
                error={ nickNameValidation() }
                helperText={ nickNameError }
                id="outlined-required"
                onFocus={ () => { if (!clickedNickName) { setNickNameError('닉네임은 필수 항목입니다.'); setClickedNickName(true); } } }
                onChange={ handleNickNameChange }
              />
            </Grid>
            <Grid item>
              <h5> Age </h5>
              <Select
                label="Age"
                value={age}
                onChange={handleAgeChange}
                input={<SelectInput />}
              >
                <MenuItem value=""><em>Age</em></MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <h5> Tall(cm) </h5>
              <SliderInput
                min={50}
                max={180}
                value={tall}
                valueLabelDisplay="auto"
                onChange={handleTallChange}
              />
              <span className={styles.texts}>{tall}cm</span>
            </Grid>
            <Grid item>
              <h5> Weight(kg) </h5>
              <SliderInput
                min={10}
                max={100}
                value={weight}
                valueLabelDisplay="auto"
                onChange={handelWeightChange}
              />
              <span className={styles.texts}>{weight}kg</span>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <AddButton onClick={onAdd}>Add</AddButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}