import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import styles from '../Games.module.css'
import Header from '../gameHeader'
import LeftGameScreen from './LeftGameScreen'
import RightGameScreen from './RightGameScreen'
import Grid from '@mui/material/Grid';
import { Route, Link, NavLink } from 'react-router-dom';
import GameStartCount from '../gameStartCount'
import { useDispatch, useSelector } from 'react-redux';
import { requestRandomGameByAge } from '../../../app/actions/userActions'
// import intro from '../../../sounds/follow_intro.mp3'
import f_text from '../../../images/followMe/f_text.png'
import baseMonkey from '../../../images/games/base_monkey.gif'
import { request } from '../../../utils/axios'

  // BGM
  // useEffect(() => {
  //   BGM.play()
  //     .catch(() => {
  //       console.log('not played')
  //     })

  //   return () => BGM.pause()
  // }, [])
const size = 800;
const flip = true;
const faceImg = new Image()
faceImg.src = "http://k5d205.p.ssafy.io:8080/img/cat.png";



export function FollowMe(props) {
  const [image, setImage] = useState(baseMonkey)
  // const introBGM = new Audio(intro)

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const webcamRef = useRef(null)
  const requestRef = useRef(null)
  const modelRef = useRef(null)

  const idx = useRef(0)
  const isStarted = useRef(false)
  const isEngaged = useRef(false)
  const successThreshold = useRef(0)
  const isDrawing = useRef(false)

  

  const msAppeared = useRef(0)
  const [isAppeared, setIsAppeared] = useState(false)
  const msFullbody = useRef(0)
  const [isFullbody, setIsFullbody] = useState(false)

  const dispatch = useDispatch()
  const [dummyProgressData, setDummyProgressData] = useState(30)
  const [seconds, setSeconds] = useState(0)
  const [openStartCount, setOpenStartCount] = useState(false)
  // const [exerciseList, setExerciseList] = useState([])
  const exerciseList = useRef([])

  const startWebcam = async() => {
    try {
      webcamRef.current = new window.tmPose.Webcam(size, size, flip);
      await webcamRef.current.setup()
      await webcamRef.current.play();
    } catch {
      throw new Error('camera issue')
    }
    // webcamRef.current.update();
  }

  const requestGameData = async() => {
    const params = { level: 1 }
    dispatch(requestRandomGameByAge(params))
      .then(res => {
        console.log(res)
        exerciseList.current = res.payload.data
      })
      .catch(() => {
        throw new Error('server connection issue')
      })
  }

  // init()
  const init = () => {
    // getCanvas
    // introBGM.play()
    canvasRef.current.width = size;
    canvasRef.current.height = size;
    contextRef.current = canvasRef.current.getContext('2d');
    // getWebcam, requestGameData
    Promise.all([startWebcam(), requestGameData()])
      .then(async() => {
        const modelURL = exerciseList.current.modelLink
        const metaURL = exerciseList.current.metaLink
        modelRef.current = await window.tmPose.load(modelURL, metaURL)
        requestRef.current = requestAnimationFrame(loop)
      })
      .catch(err => console.log(err.message))  // do sth! e.g.) redirection / alert / re-request
  }

  const loop = (timestamp) => {
    if (!isDrawing.current) {
      loopIdentity(timestamp)
    }
    requestRef.current = requestAnimationFrame(loop)
  }

  const loopIdentity = async(timestamp) => {
    webcamRef.current.update()
    const { pose, posenetOutput } = await modelRef.current.estimatePose(webcamRef.current.canvas)

    // 아예 사람이 없음
    if (pose === undefined) {
      if (timestamp - msAppeared.current > 1000) {
        setIsAppeared(false)
      }
      contextRef.current.drawImage(webcamRef.current.canvas, 0, 0)
      isDrawing.current = false
      return
    }
    msAppeared.current = timestamp
    setIsAppeared(true)
    

    await checkPose(pose.pose)
      .then(() => {  // 전신 O
        msFullbody.current = timestamp
        setIsFullbody(true)
      })
      .catch(() => {  // 사람은 있으나 전신 X
        if (timestamp - msFullbody.current > 1000) {
          // console.log('전신안나옴')
          setIsFullbody(false)
        }
      })

    drawPose(pose)
    
    switch (isStarted.current) {
      case false:
        if (!isEngaged.current) 
          handleStart()
        console.log('not started')
        isDrawing.current = false
        break
      case true:
        await predict(posenetOutput)
          .then(res => {
            // console.log(res)
            if (res === true) {
              successThreshold.current += 1
              isDrawing.current = false
              if (successThreshold.current > 50) {
                handleSuccess()
              }
              else
              isDrawing.current = false
            } else {
              if (successThreshold.current > 0)
                successThreshold.current -= 2
                isDrawing.current = false
            }
          })
        break
      default:
        isDrawing.current = false
    }
  }



  const predict = async(posenetOutput) => {
    const prediction = await modelRef.current.predict(posenetOutput)
    const exerciseIdx = exerciseList.current.asset[idx.current].aid
    const current = prediction[exerciseIdx]
    if (current.probability.toFixed(2) > 0.8) 
      return true
    else 
      return false
      // throw new Error('wrong pose')
  }

  const checkPose = async(pose=null) => {
    // catch
    if (pose === null)
      throw new Error('Nullpose')
    
    // then => true || false
    const keypoints = pose.keypoints.slice(5, 16)
    return keypoints.every(p => p > 0.5)
  }

  const drawPose = (pose=undefined) => {
    if (pose === null || undefined)
      return
    
    if (!webcamRef.current.canvas)
      return
    
    try {
      contextRef.current.drawImage(webcamRef.current.canvas, 0, 0)
      let eyeSize = Math.sqrt(
        Math.pow(pose.keypoints[1].position.x - pose.keypoints[2].position.x, 2) +
        Math.pow(pose.keypoints[1].position.y - pose.keypoints[2].position.y, 2)
      )
  
      const minPartConfidence = 0.5
      window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, contextRef.current);
      window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, contextRef.current);
  
      if (pose.keypoints[0].score > 0.8) {
        contextRef.current.drawImage(
          faceImg,
          pose.keypoints[0].position.x - eyeSize * 2,
          pose.keypoints[0].position.y - eyeSize * 3,
          eyeSize * 5,
          eyeSize * 5,
        ) 
      }
    } catch {
      console.log(pose)
      return
    }
  }

  const handleStart = async() => {
    isEngaged.current = true
    console.log('manipulate DOM here')
    
    // 

    isStarted.current = true
    isEngaged.current = false
  }

  const handleSuccess = () => {

  }


  useLayoutEffect(() => {
    init()
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  // useEffect(() => {
  //   console.log('second changed')
  //   const interval = setInterval(() => {
  //     if (seconds > 0) {
  //       console.log('tick tock')
  //       setSeconds(c => c - 1);
  //       // setSeconds(seconds => seconds - 1); // same code
  //     }
  //     else {
  //       console.log('times up!')
  //       clearInterval(interval)
  //       setOpenStartCount(false)
  //     }
  //   }, 1000)
  //   // returned function => for clean up (leaving)
  //   return () => clearInterval(interval)
  // }, [seconds])

  const endGame = () => {
    props.history.push('/home')
  }

  useEffect(() => {
    console.log(testFlag)
  }, [testFlag])

  return(
    <div className={styles.container}>
      {/* {seconds} */}

      <Header progress={dummyProgressData} onEndgameClick={endGame} />
      {/* <button onClick={() => {setSeconds(3); setOpenStartCount(true);}}>set 3sec timer</button> */}
      <Grid 
        container 
        // direction="column" 
        justifyContent="center" 
        alignItems="center"
        // sx={{width: '100%', height: '100%'}}
      >
        <Grid item md={12} mt={'50px'}>
          <img src={f_text} width={'250px'}/>
        </Grid>
        <Grid item md={4} mt={'5%'}>
          <LeftGameScreen img={image} />
        </Grid>
        <Grid item md={1} mt={'5%'}></Grid>
        <Grid item md={4} mt={'5%'}>
          <canvas ref={canvasRef} />
          {/* <RightGameScreen /> */}
        </Grid>
      </Grid>
      {/* send progress data as props to Header */}
      {/* <img src={baseMonkey} loop={'infinte'} width={'600px'}/> */}
      <GameStartCount open={openStartCount} text={seconds ? seconds : '시작!'} />
    </div>
  )
}