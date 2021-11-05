import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid'
import { MoveCharactor } from './MoveCharactor'
import { BeforeStart } from '../BeforeStart'
import styles from './Mugunghwa.module.css'
import MotionDialog from './MotionDialog'
import m_text from '../../../images/mugunghwa/m_text.png'
import GameHeader from '../gameHeader'

export function Mugunghwa(props){
  // 현재 위치 나타내기 위한 변수
  const [move, setMove] = useState(-1)

  // 따라하기 위한 이미지 팝업으로 보여주기 위한 플래그
  const [imgOpen, setImgOpen] = useState(false)

  // 따라하기 위한 이미지 api로 받아와서 img src를 팝업에 넘겨주기 위한 변수
  const [motionImg, setMotionImg] = useState('')

  // 총 게임 카운트(설정해둔 전체 루프)가 끝나면 MoveCharactor.js에서 호출하는 함수
  const onEndGame = () => {
    console.log('game end')
  }

  // MoveCharactor.js에서 한 턴이 끝나면 onCheckMotion()을 호출하고
  // onCheckMotion()에서 모션 성공 시 다음칸으로 넘어가기 위해 setMove 하면
  // 실제로 move 변경을 감지하고 webcam이동
  useEffect(()=>{
    console.log(move)

    if(move>=0 && move<4){
      const before = document.getElementById(`box${move}`)
      const after = document.getElementById(`box${move+1}`)

      before.innerHTML = ''
      const user = document.createElement('div')
      user.id = 'webcam'
      user.className = styles.userBox
      after.appendChild(user)
    }
  }, [move])

  const onChcekMotion = () =>{
    let check = true // 추후 모선이 성공했는지 여부를 함수로 return 받기

    if(check){ // 자세 통과
      setTimeout(function(){
        setMove(move=>move+ 1)
      },4000)
    }
  }

  // MoveCharactor.js에서 한 턴이 시작됨을 알리면서 호출하는 함수
  // 새로운 턴이 시작되면 수행해야할 동작 img를 api로 받아서 setMotionImg로 설정하고
  // setImgOpen을 true로 설정해 따라할 동작을 팝업으로 띄움
  const onShowMotion = () => {
    setMotionImg(motionImg=>motionImg+'a')
    setImgOpen(true)
  }

  const onGetClose = () => {
    setImgOpen(false)
  }

  // 게임종료 버튼 클릭시 핸들러
  const endGame = () => {
    // props.history.push('/home')
    window.location = '/home'
  }

  return(
    <div className={styles.mugunghwa_container}>
      <GameHeader progress={move} onEndgameClick={endGame}/>
      <BeforeStart />
      <Grid 
        container
        // direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={12} mt={'50px'}>
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