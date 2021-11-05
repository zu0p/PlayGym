import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid'
import { MoveCharactor } from './MoveCharactor'
import { BeforeStart } from './BeforeStart'
import styles from './Mugunghwa.module.css'
import MotionDialog from './MotionDialog'
import m_text from '../../../images/mugunghwa/m_text.png'

export function Mugunghwa(){
  // const [move, setMove] = useState(0)
  const [imgOpen, setImgOpen] = useState(false)
  const [motionImg, setMotionImg] = useState('')
  let move = 0
  const onEndGame = () => {
    console.log('game end')
  }

  const onChcekMotion = () =>{
    // console.log('check motion')
    let check = true

    if(move>=4){
      console.log('endddd')
      return
    }
    if(check){ // 자세 통과
      setTimeout(function(){
        const before = document.getElementById(`box${move}`)
        const after = document.getElementById(`box${move+1}`)
        // setMove(move=>move+ 1)
        move++

        before.innerHTML = ''
        const user = document.createElement('div')
        user.id = 'webcam'
        user.className = styles.userBox
        after.appendChild(user)
      },4000)
    }
  }

  const onShowMotion = () => {
    console.log('before:'+move)
    setImgOpen(true)
    setMotionImg(move)
  }

  const onGetClose = () => {
    setImgOpen(false)
  }

  return(
    <div className={styles.mugunghwa_container}>
      <BeforeStart />
      <Grid 
        container
        // direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Grid item id='img-sequence'>
          <canvas width='500' height='500' id='screen'></canvas>
        </Grid>
        <Grid>
          <audio id='back_sound' controls src={mugunghwa}> Your user agent does not support the HTML5 Audio element. </audio>
        </Grid> */}
        <Grid item md={12} mt={'3%'}>
          <img src={m_text} width={400}/>
        </Grid>
        <Grid item md={2} className={styles.goalLine}>
          <MoveCharactor getEndGame={onEndGame} getCheckMotion={onChcekMotion} showMotion={onShowMotion}/>
        </Grid>
        <Grid item md={2} className={styles.nomalLine} id='box4'>
          
        </Grid>
        <Grid item md={2} className={styles.stepLine} id='box3'>
          
        </Grid>
        <Grid item md={2} className={styles.stepLine} id='box2'>
          
        </Grid>
        <Grid item md={2} className={styles.stepLine} id='box1'>
          
        </Grid>
        <Grid item md={2} className={styles.stepLine} id='box0'>
          <div id='webcam' className={styles.userBox}>
          </div>
        </Grid>
      </Grid>

      <MotionDialog open={imgOpen} img={motionImg} getClose={onGetClose}/>
    </div>
  )
}