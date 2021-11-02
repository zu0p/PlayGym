import React, { useState } from 'react';
import Grid from '@mui/material/Grid'
import { CircleButton } from './customHomeStyle'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styles from './Home.module.css'
import mugunghwa from '../../images/games/game_mugunghwa.png'
import follow_me from '../../images/games/game_follow_me.png'
import word from '../../images/games/game_word.png'
import { AddButton } from '../profile/customProfileStyle'

export function Home() {
  const onMugunghwaClick = () => {
    console.log('무궁화꽃이 피었습니다')
  }

  const onFollowMeClick = () => {
    console.log('날 따라해봐요')
  }

  const onWordClick = () => {
    console.log('단어맞추기')
  }
  return (
    <div className={styles.home_container}>
      <Grid 
        container
        justifyContent="center"
        alignItems="center"
      >
        <CircleButton >
          <AccountCircleOutlinedIcon fontSize="large"/>
        </CircleButton>

        <Grid item md={1} mt={'5%'}></Grid>
        <Grid item md={4} mt={'5%'}>
          <div 
            className={styles.img_container} 
            style={{
              backgroundImage: `url(${mugunghwa})`,
              backgroundPosition: '50% -70%'
            }}>
            <AddButton onClick={onMugunghwaClick} className={styles.game_start_button}>무궁화 꽃이 피었습니다</AddButton>
          </div>
        </Grid>
        <Grid item md={2} mt={'5%'}>
        </Grid>
        <Grid item md={4} mt={'5%'}>
          <div 
            className={styles.img_container} 
            style={{
              backgroundImage: `url(${follow_me})`
            }}>
            <AddButton onClick={onFollowMeClick} className={styles.game_start_button}>날 따라 해봐요</AddButton>
          </div>
        </Grid>
        <Grid item md={1} mt={'5%'}></Grid>

        
        
        <Grid item md={4} mt={'5%'}></Grid>
        <Grid item md={4} mt={'5%'}>
          <div 
            className={styles.img_container} 
            style={{
              backgroundImage: `url(${word})`
            }}>
            <AddButton onClick={onWordClick} className={styles.game_start_button}>단어 맞추기</AddButton>
          </div>
        </Grid>
        <Grid item md={4} mt={'5%'}></Grid>
      </Grid>
    </div>
  );
}
