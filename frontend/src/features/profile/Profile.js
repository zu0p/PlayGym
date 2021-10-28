import React, { useEffect, useState } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Profile.module.css'
import Grid from '@mui/material/Grid'
import { motion } from 'framer-motion'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit';
import GavelIcon from '@mui/icons-material/Gavel';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AddProfileDialog from './AddProfileDialog'
import { SmallDarkButton, EditButton } from './customProfileStyle'
import {BackAnimation} from '../login/styledComponent'
import cloudImage from '../../images/background_cloud.png'
import selectPlayer from '../../images/selectPlayer.png'
import bear from '../../images/characters/bear.png';
import cat from '../../images/characters/cat.png';
import chick from '../../images/characters/chick.png';
import rabbit from '../../images/characters/rabbit.png';

function Player({player}){
  const selectPlayer=()=>{
    console.log(player)
  }
  const onEditPlayerClick = (e) => {
    console.log('ddd')
    e.stopPropagation()
    // console.log(player)
  }
  return(
    <div>
      <Grid item onClick={selectPlayer}>
        <div className={styles.player}>
          <img src={player.image} width='100px'/>
        </div>

        <EditButton onClick={onEditPlayerClick}><GavelIcon fontSize="small"/></EditButton>
        {player.name}
      </Grid>
    </div>
  )
}

export function Profile(){
  const players = [ // sub user(children) list
    {
      id: 0,
      name: '첫째',
      image: bear
    },
    {
      id: 1,
      name: '둘째',
      image: chick
    },
    {
      id: 2,
      name: '막둥',
      image: cat
    },
    {
      id:3,
      name: '주영',
      image: rabbit
    }
  ]

  const onEditProfileClick = () => {
    console.log('edit profile')
  }

  // add profile click -> open dialog
  const [open, setOpen] = React.useState(false);
  const onAddProfileClick = () => {
    setOpen(true)
  }

  const onAddProfileClose = () => {
    setOpen(false);
  };

  return(
    <div className={styles.profile_container}>
      <BackAnimation 
        animate={{ 
          scale: 0, 
          x:-100, 
          y:-100,
          position: 'fixed',
          top:'-50px',
          left:'-100px'
        }}
        transition={{ duration: 1.2 }}
      >
        <img src={cloudImage} style={{width:'500px'}}/>
      </BackAnimation>
      <BackAnimation 
        animate={{ 
          scale: 0, 
          x:100, 
          y:-100,
          position: 'fixed',
          top:'-50px',
          left:'90%'
        }}
        transition={{ duration: 1.2 }}
      >
        <img src={cloudImage} style={{width:'500px'}}/>
      </BackAnimation>
      <BackAnimation 
        animate={{ 
          scale: 0, 
          x:-100, 
          y:100,
          position: 'fixed',
          top:'80%',
          left:'-100px'
        }}
        transition={{ duration: 1.2 }}
      >
        <img src={cloudImage} style={{width:'500px'}}/>
      </BackAnimation>
      <BackAnimation 
        animate={{ 
          scale: 0, 
          x:100, 
          y:100,
          position: 'fixed',
          top:'80%',
          left:'90%'
        }}
        transition={{ duration: 1.2 }}
      >
        <img src={cloudImage} style={{width:'500px'}}/>
      </BackAnimation>
      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item mt={'10%'} mb={'2%'}>
          <img src={selectPlayer} width='600px'/>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            {players.map(item=>(<Player key={item.id} player={item}/>))}

            <Tooltip title="Add Player">
              <IconButton onClick={onAddProfileClick}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid> 

        <Grid item width="100vh" mt={'10%'}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <SmallDarkButton onClick={onEditProfileClick}>
              나의 정보 수정하기 <EditIcon />
            </SmallDarkButton>
            <SmallDarkButton onClick={onEditProfileClick}>
              플레이어 현황 <ChildCareIcon />
            </SmallDarkButton>
          </Grid>
        </Grid>
      </Grid>
      <AddProfileDialog open={open} getClose={onAddProfileClose}/>
    </div>
  )
}