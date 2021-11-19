import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid'
import { CircleButton } from './customHomeStyle'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styles from './Home.module.css'
import mugunghwa from '../../images/games/game_mugunghwa.png'
import follow_me from '../../images/games/game_follow_me.png'
import word from '../../images/games/game_word.png'
import { AddButton } from '../profile/customProfileStyle'
import Logout from '../logout/Logout'
import ProfileButton from '../profile/ProfileButton'
import { requestGetGameList } from '../../app/actions/userActions'
import { useDispatch } from 'react-redux';
import LockIcon from '@mui/icons-material/Lock'
import { Background } from '../background/Background';
import { BackChar } from '../background/BackChar';
import { BackLogo } from '../background/BackLogo';

export function Home(props) {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(requestGetGameList())
    .then(res=>{
      // console.log(res)
    })
  }, [])

  const dummyAudio = new Audio()

  const onMugunghwaClick = () => {
    // console.log('무궁화꽃이 피었습니다')
    props.history.push('/mugunghwa')
    dummyAudio.play()
  }

  const onFollowMeClick = () => {
    // console.log('날 따라해봐요')
    dummyAudio.play()
    props.history.push('/followme')
  }

  const onWordClick = () => {
    // console.log('단어맞추기')
    dummyAudio.play()
  }
  return (
    <div className={styles.home_container}>
      <Grid 
        container
        justifyContent="center"
        alignItems="center"
        style={{position:'relative', zIndex:300}}
      >
        <Logout />
        <ProfileButton />
        <CircleButton onClick={() => {props.history.push('/mypage')}} style={{position:'fixed', top:'10px', left:'110px', zIndex: 2}}>
          <AccountCircleOutlinedIcon fontSize="large" />
        </CircleButton>
        <BackLogo />
        <Grid item md={12} mt={'150px'}></Grid>

        <Grid item md={1}></Grid>
        <Grid item md={4} >
          <div 
            className={styles.img_container} 
            style={{
              backgroundImage: `url(${mugunghwa})`,
              backgroundPosition: '50% -70%',
            }}>
            <AddButton onClick={onMugunghwaClick} className={styles.game_start_button}>무궁화 꽃이 피었습니다</AddButton>
          </div>
        </Grid>
        <Grid item md={2}>
        </Grid>
        <Grid item md={4}>
          <div 
            className={styles.img_container} 
            style={{
              backgroundImage: `url(${follow_me})`
            }}>
            <AddButton onClick={onFollowMeClick} className={styles.game_start_button}>나 처럼 해봐요</AddButton>
          </div>
        </Grid>
        <Grid item md={1}></Grid>

        <Grid item md={4} mt={'5%'}></Grid>
        <Grid item md={4} style={{position: 'relative'}}>
          <LockIcon fontSize="large" style={{position: 'absolute', zIndex: 2, top: '45%', left: '45%'}}/>
          <div 
            className={styles.img_container} 
            style={{
              backgroundImage: `url(${word})`,
              backgroundColor: 'gray',
              opacity: 0.5
            }}>
            <AddButton disabled={true} onClick={onWordClick} className={styles.game_start_button}>단어 맞추기</AddButton>
          </div>
        </Grid>
        <Grid item md={4} mt={'5%'}></Grid>
      </Grid>
      <Background />
      <BackChar />
    </div>
  );
}
