import React, {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { requestMugunghwaGame, requestGameSuccessSave } from '../../../app/actions/userActions'
import Grid from '@mui/material/Grid'
import { MoveCharactor } from './MoveCharactor'
import { BeforeStart } from '../BeforeStart'
import {BackMug} from '../../background/BackMug'
import styles from './Mugunghwa.module.css'
import MotionDialog from './MotionDialog'
import m_text from '../../../images/mugunghwa/m_text.png'
import GameHeader from '../gameHeader'
import EndDialog from '../EndDialog';
import game_clear from '../../../sounds/game_clear.mp3'
import game_fail from '../../../sounds/game_fail.mp3'
const size = 800;
const width = 500; //260
const height = 600;
const flip = true;
const faceImg = new Image()
// faceImg.src = "https://k5d205.p.ssafy.io/api/img/bear.png";
faceImg.src = require('../../../images/mugunghwa/mug_face.png').default

export function Mugunghwa(props){
  const [replay, setReplay] = useState(false)

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const webcamRef = useRef(null)
  const requestRef = useRef(null)
  const modelRef = useRef(null)
  const successThreshold = useRef(0)

  const checkbody = useRef(0)
  const checkperf = useRef(0)

  const dispatch = useDispatch()
  const [dummyProgressData, setDummyProgressData] = useState(30)
  const [seconds, setSeconds] = useState(0)
  const [openStartCount, setOpenStartCount] = useState(false)
  const exerciseList = useRef([])
  const loopFlag = useRef(false)
  const isSuccess = useRef(false)
  const motionCnt = useRef(-1)

  // block pop history
  useEffect(() => {
    const preventGoBack = () => {
      // change start
      window.history.pushState(null, '', window.location.href);
      // change end
      // console.log('prevent go back!');
    };
    
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);
    
    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);   

  const startWebcam = async() => {
    try {
      webcamRef.current = new window.tmPose.Webcam(600, 600, flip);
      await webcamRef.current.setup()
      await webcamRef.current.play();
    } catch {
      throw new Error('camera issue')
    }
    // webcamRef.current.update();
  }

  const loop = async(timestamp) => {
    // console.log(loopFlag.current)
    webcamRef.current.update()
    if(!loopFlag.current){
      // console.log('loop')
      await predict()
        .then(res => {
          if (res === true) {
            successThreshold.current += 1
            // console.log(successThreshold.current)
            if (successThreshold.current > 50){
              isSuccess.current = true
              // console.log('success!!!!!!!!!!!');
            }
            else{
              cancelAnimationFrame(requestRef.current)
              requestRef.current = requestAnimationFrame(loop)
            }
          } else {
            if (successThreshold.current > 0)
              successThreshold.current -= 2
            cancelAnimationFrame(requestRef.current)
            requestRef.current = requestAnimationFrame(loop)
          }
          // if(res == true)console.log("true")
          // else console.log("false")
          
        }) 
      
        return
    }
    // console.log('!loop')
    // setTimeout(async function(){
    //   const {pose, posenetOutput} = await modelRef.current.estimatePose(webcamRef.current.canvas)
    
    //   drawPose(pose)
    //   requestRef.current = requestAnimationFrame(loop)
    // }, 700)

    try{
      const {pose, posenetOutput} = await modelRef.current.estimatePose(webcamRef.current.canvas)
      drawPose(pose)
    }catch(e){
      console.log(e)
    }
    requestRef.current = requestAnimationFrame(loop)
    // const pose = await modelRef.current.estimatePose(webcamRef.current.canvas)
    // .catch(err=>{
    //   console.log(err)
    //   requestRef.current = requestAnimationFrame(loop)
    // })

    // await checkPose(pose.pose)
    //   .then(res => {
    //     if (res) {
    //       checkbody.current = 0
    //       checkperf.current += 1
    //       if (checkperf.current > 30) 
    //         checkperf.current = 0;
    //     } else {
    //       checkperf.current = 0
    //       checkbody.current += 1
    //       if (checkbody.current > 40)
    //         checkbody.current = 0;
    //     }
          
    //     if (checkperf.current > 20)
    //       console.log('몸이 다 나왔어요');
    //     if (checkbody.current > 30)
    //       console.log('몸 전체가 나오지 않아요')
    //   })
    //   .catch(err => {
    //     console.log(err.message)
    //   })
    
  }

  const predict = async() => {
    const { pose, posenetOutput } = await modelRef.current.estimatePose(webcamRef.current.canvas)
    const prediction = await modelRef.current.predict(posenetOutput)

    // console.log('==================')
    // prediction.map(item=>{
    //   console.log(item.probability.toFixed(2))
    // })
    // 현재 수행하는 motion의 aid
    if(motionCnt.current<0){
      // console.log(prediction)
      drawPose(pose)
      return false
    } 
    let idx = exerciseList.current[motionCnt.current].classNumber -1
    // console.log(idx+" "+exerciseList.current[motionCnt.current].name)
    if (prediction[idx].probability.toFixed(2) > 0.7) 
      return true
    else {
      drawPose(pose)
      return false
      // throw new Error('wrong pose')
    }
  }

  const checkPose = async(pose) => {
    // catch
    if (pose === null)
      throw new Error('Nullpose')
    
    if (pose.keypoints.length < 16)
      throw new Error('Unrecognizable')

    // then => true || false
    const keypoints = pose.keypoints.slice(5, 15)
    return keypoints.every(p => p > 0.5)
  }

  const drawPose = pose => {
    if (pose === null || pose === undefined)
      return
    
    if (!webcamRef.current.canvas)
      return
    
    contextRef.current.drawImage(webcamRef.current.canvas, 0, 0)
    let eyeSize = Math.sqrt(
      Math.pow(pose.keypoints[1].position.x - pose.keypoints[2].position.x, 2) +
      Math.pow(pose.keypoints[1].position.y - pose.keypoints[2].position.y, 2)
    )

    // const minPartConfidence = 0.5
    // window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, contextRef.current);
    // window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, contextRef.current);

    if (pose.keypoints[0].score > 0.8) {
      contextRef.current.drawImage(
        faceImg,
        pose.keypoints[0].position.x - eyeSize * 2,
        pose.keypoints[0].position.y - eyeSize * 3,
        eyeSize * 5,
        eyeSize * 5,
      ) 
    }
  }

  useEffect(() => {
    canvasRef.current.width = width
    canvasRef.current.height = height
    contextRef.current = canvasRef.current.getContext('2d')

    const params = {
      level: 1,
    }
    dispatch(requestMugunghwaGame(params))
      .then(async res => {
        exerciseList.current = res.payload.asset
        // console.log(exerciseList.current)
        // console.log(res)
        modelRef.current = await window.tmPose.load(res.payload.modelLink, res.payload.metaLink)
        startWebcam().then(()=>{
          requestRef.current = requestAnimationFrame(loop)
        })
      })
      .catch((e) => {
        console.log(e)
      })

    return () => cancelAnimationFrame(requestRef.current)
  }, [replay])


  // 현재 위치 나타내기 위한 변수
  const [move, setMove] = useState(-1)

  // 따라하기 위한 이미지 팝업으로 보여주기 위한 플래그
  const [imgOpen, setImgOpen] = useState(false)

  // 따라하기 위한 이미지 api로 받아와서 img src를 팝업에 넘겨주기 위한 변수
  const [motionImg, setMotionImg] = useState('')

  // 총 게임 카운트(설정해둔 전체 루프)가 끝나면 MoveCharactor.js에서 호출하는 함수
  const [isEnd, setIsEnd] = useState(false)
  const onEndGame = () => {
    loopFlag.current = true
    cancelAnimationFrame(requestRef.current)
    // console.log('game end')
    setIsEnd(true)
  }

  const [gameRes, setGameRes] = useState(0)
  useEffect(()=>{
    if(isEnd){ // 모든 턴이 다 끝나서 게임 종료 시점
      if(move == 2){
        // 게임 성공 후 api 호출
        const param = {
          "user": localStorage.getItem('sub-user'),
          "gameid": 2 
        }
        dispatch(requestGameSuccessSave(param))
          .then(res=>{
            // console.log(res)
          })
        setGameRes(1)
      }
      else{
        setGameRes(-1) 
      }
    }
  },[move, motionCnt.current, isEnd])

  const [endOpen, setEndOpen] = useState(false)
  useEffect(()=>{
    if(gameRes!=0)
      setEndOpen(true)
  }, [gameRes])

  // 게임 종료 후 end dialog 에서 홈으로 돌아가기 버튼 클릭
  // == 종료 후 게임 메인페이지로 이동
  const onGetEndClose = () => {
    // console.log('close')
    setEndOpen(false)
    setIsEnd(false)
    endGame()
  }

  // 게임 종료 후 end dialog 에서 다시하기 버튼 클릭
  // 게임 리플레이
  const onGetReplay = () => {
    setEndOpen(false)
    setIsEnd(false)
    setMove(-1)
    motionCnt.current = -1
    imgCnt = 0
    setGameRes(0)
    isSuccess.current = false

    // 새로 그리기
    const webcam = document.getElementById('webcam')
    for(let i = 0; i<3; i++){
      document.getElementById(`box${i}`).innerHTML = ''
    }
    document.getElementById(`box0`).appendChild(webcam)

    setReplay(prev=>!prev)
  }

  // MoveCharactor.js에서 한 턴이 끝나면 onCheckMotion()을 호출하고
  // onCheckMotion()에서 모션 성공 시 다음칸으로 넘어가기 위해 setMove 하면
  // 실제로 move 변경을 감지하고 webcam이동
  useEffect(async()=>{
    if(move>=0 && move<2){
      const before = document.getElementById(`box${move}`)
      const after = document.getElementById(`box${move+1}`)

      const webcam = document.getElementById('webcam')
      before.innerHTML = ''
      after.appendChild(webcam)

      // 초록색 테두리 깜빡
      const canvas = document.getElementById('canvas')
      canvas.style.border = '10px solid #A3C653'
      canvas.style.boxSizing = 'border-box'
      // canvas.width = width-20;
      // canvas.height = height-20;
      setTimeout(function(){
        canvas.style.border = 'none'
        // canvas.width = width;
        // canvas.height = height;
      }, 1000)

      // const canvas = document.getElementById('canvas')
      canvas.width = width;
      canvas.height = height;
      contextRef.current = canvas.getContext('2d')

      startWebcam().then(()=>{
        // console.log(modelRef)
        cancelAnimationFrame(requestRef.current)
        requestRef.current = requestAnimationFrame(loop)
      })
    }
  }, [move])

  const onCheckMotion = async() =>{
    loopFlag.current = false // == predict를 하겠다
    // console.log("check motion")
    motionCnt.current++

    let cnt = 0
    let timer = setInterval(function(){
      if(cnt==2){
        loopFlag.current = true
        clearInterval(timer)
      }
      cnt++
    }, 1000)
    setTimeout(function(){
      // console.log(isSuccess.current)
      if(isSuccess.current){ // 자세 유지 성공 시 -> move 
      // let test = true
      // if(test){ // 자세 유지 성공 시 -> move
        // console.log('자세유지성공~~~~')
        setMove(move=>move+1)
        isSuccess.current = false
      }
      else{ // 자세 유지 실패 시
        // console.log('자세유지실패ㅠㅠㅠ')
        const canvas = document.getElementById('canvas')
        canvas.style.border = '10px solid #AC3943'
        setTimeout(function(){
          canvas.style.border = 'none'
        }, 1000)
        cancelAnimationFrame(requestRef.current)
        requestRef.current = requestAnimationFrame(loop)
      }
    }, 3500)
  }

  // MoveCharactor.js에서 한 턴이 시작됨을 알리면서 호출하는 함수
  // 새로운 턴이 시작되면 수행해야할 동작 img를 api로 받아서 setMotionImg로 설정하고
  // setImgOpen을 true로 설정해 따라할 동작을 팝업으로 띄움
  let imgCnt = 0
  const onShowMotion = () => {
    setMotionImg(exerciseList.current[imgCnt++].image)
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
    <div className={styles.mugunghwa_container} id='mug'>
      <GameHeader progress={(move+1)*33} onEndgameClick={endGame}/>
      <BeforeStart />
      <BackMug />
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
          <MoveCharactor replay={replay} getEndGame={onEndGame} getCheckMotion={onCheckMotion} showMotion={onShowMotion}/>
        </Grid>

        <Grid item md={3} className={styles.nomalLine} id='box2'>
        </Grid>

        {/* <Grid item md={3} className={styles.stepLine} id='box3'>
        </Grid>

        <Grid item md={3} className={styles.stepLine} id='box2'> 
        </Grid> */}

        <Grid item md={3} className={styles.stepLine} id='box1'>
        </Grid>

        <Grid item md={3} className={styles.stepLine} id='box0'>
          <div id='webcam' className={styles.userBox}>
            <canvas id='canvas' ref={canvasRef}/>
          </div>
        </Grid>
      </Grid>
      <audio id='clear_sound' style={{display:'none'}} controls src={game_clear} > Your user agent does not support the HTML5 Audio element. </audio>
      <audio id='fail_sound' style={{display:'none'}} controls src={game_fail} > Your user agent does not support the HTML5 Audio element. </audio>


      <MotionDialog open={imgOpen} img={motionImg} getClose={onGetClose}/>
      <EndDialog open={endOpen} gameRes={gameRes} getEndClose={onGetEndClose} getReplay={onGetReplay}/>
    </div>
  )
}