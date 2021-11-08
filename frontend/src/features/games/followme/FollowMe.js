import React, {useEffect, useState, useRef} from 'react'
import styles from '../Games.module.css'
import Header from '../gameHeader'
import LeftGameScreen from './LeftGameScreen'
import RightGameScreen from './RightGameScreen'
import Grid from '@mui/material/Grid';
import { Route, Link, NavLink } from 'react-router-dom';
import GameStartCount from '../gameStartCount'
import { useDispatch, useSelector } from 'react-redux';
import { requestRandomGameByAge } from '../../../app/actions/userActions'
import mimicBGM from '../../../images/나처럼해봐요.mp3'
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
  const BGM = new Audio(mimicBGM)

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
    const params = {
      ageStep: 1,
      count: 2,
    }
    dispatch(requestRandomGameByAge(params))
      .then(res => {
        exerciseList.current = res.payload.data.result.Game
      })
      .catch(() => {
        throw new Error('server connection issue')
      })
  }

  // init()
  const init = () => {
    // getCanvas
    canvasRef.current.width = size;
    canvasRef.current.height = size;
    contextRef.current = canvasRef.current.getContext('2d');
    // getWebcam, requestGameData
    Promise.all([startWebcam(), requestGameData()])
      .then(() => {
        iterExercise()
      })  // start iterating
      .catch(err => console.log(err.message))  // do sth! e.g.) redirection / alert / re-request
  }

  const iterExercise = async() => {
    for (let i = 0; i < exerciseList.current.length; i++) {
      let exercise = exerciseList.current[i].execSub;
      for (let j = 0; j < exercise.length; j++) {
        if (exercise[j].modelLink === null) {
          console.log('@@ null modelLink continue @@')
          continue
        }
        console.log('iteration started')
        let modelURL = exercise[j].modelLink;
        let metadataURL = exercise[j].metaLink;
        setImage(`${exercise[j].imgLink}`)
        modelRef.current = await window.tmPose.load(modelURL, metadataURL)
        // let maxPredictions = modelRef.current.getTotalClasses()
        
        // code here to handle start
        requestRef.current = requestAnimationFrame(loop)
      }
    }
  }

  const loop = async(timestamp) => {
    console.log('loop')
    webcamRef.current.update()
    const pose = await modelRef.current.estimatePose(webcamRef.current.canvas)

    await checkPose(pose.pose)
      .then(res => {
        if (res) {
          checkbody.current = 0
          checkperf.current += 1
          if (checkperf.current > 30) 
            checkperf.current = 0;
        } else {
          checkperf.current = 0
          checkbody.current += 1
          if (checkbody.current > 40)
            checkbody.current = 0;
        }
          
        if (checkperf.current > 20)
          console.log('몸이 다 나왔어요');
        if (checkbody.current > 30)
          console.log('몸 전체가 나오지 않아요')
      })
      .catch(err => {
        console.log(err.message)
      })
    
    await predict()
      .then(res => {
        if (res === true) {
          successThreshold.current += 1
          if (successThreshold.current > 10)
            console.log('success');
          else
            requestRef.current = requestAnimationFrame(loop);
        } else {
          if (successThreshold.current > 0)
            successThreshold.current -= 2
          requestRef.current = requestAnimationFrame(loop)
        }
      })

        // .then(success())
        // .catch(
        //   requestRef.current = requestAnimationFrame(loop()))
    
  }



  const predict = async() => {
    const { pose, posenetOutput } = await modelRef.current.estimatePose(webcamRef.current.canvas)
    const prediction = await modelRef.current.predict(posenetOutput)

    if (prediction[0].probability.toFixed(2) > 0.8) 
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
    if (pose === null || undefined)
      return
    
    if (!webcamRef.current.canvas)
      return
    
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
  }


  useEffect(() => {
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