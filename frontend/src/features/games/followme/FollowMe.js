import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import styles from '../Games.module.css'
import Header from '../gameHeader'
import LeftGameScreen from './LeftGameScreen'
import RightGameScreen from './RightGameScreen'
import Grid from '@mui/material/Grid';
import { Route, Link, NavLink } from 'react-router-dom';
import GameStartCount from '../gameStartCount'
import { useDispatch, useSelector } from 'react-redux';
import { 
  requestRandomGameByAge, 
  requestSubInfo,
  requestGameSuccessSave,
} from '../../../app/actions/userActions'
import f_text from '../../../images/followMe/f_text.png'
import baseMonkey from '../../../images/games/base_monkey.gif'
import { request } from '../../../utils/axios'
import intro from '../../../sounds/follow_intro.mp3'
import interlude1 from '../../../sounds/follow_interlude.mp3'
import interlude2 from '../../../sounds/follow_interlude2.mp3'
import followMe from '../../../sounds/follow.mp3'
import monkey1 from '../../../images/games/game_followMe_1.jpg'
import monkey2 from '../../../images/games/game_followMe_2.jpg'
import monkey3 from '../../../images/games/game_followMe_3.jpg'
import useIsMount from '../../../utils/useIsMount'
import EndDialog from '../EndDialog'
import game_clear from '../../../sounds/game_clear.mp3'
import game_fail from '../../../sounds/game_fail.mp3'
import { BackFollow } from '../../background/BackFollow'
// import debounce from 'lodash/debounce'

const size = 800;
const flip = true;

export function FollowMe(props) {
  const faceImg = useRef(new Image())
  
  const dispatch = useDispatch()
  const isMount = useIsMount()
  const [image, setImage] = useState(monkey1)
  
  const exerciseList = useRef({})
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const webcamRef = useRef(null)
  const requestRef = useRef(null)
  const modelRef = useRef(null)
  const audioRef = useRef(null)
  
  const idx = useRef(0)
  const isStarted = useRef(false)
  const isEngaged = useRef(false)
  const isNextLoading = useRef(false)
  const successCount = useRef(0)
  const successFlag = useRef(0)
  const successThreshold = useRef(0)
  const isDrawing = useRef(false)

  const eyeSizeArr = useRef([-1, -1, -1, -1])
  const msAppeared = useRef(0)
  const msFullbody = useRef(0)
  const [isAppeared, setIsAppeared] = useState(false)
  const [isFullbody, setIsFullbody] = useState(false)

  const [endOpen, setEndOpen] = useState(false)
  const [gameRes, setGameRes] = useState(0)
  const [progressData, setProgressData] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [openStartCount, setOpenStartCount] = useState(false)


  const startWebcam = async() => {
    try {
      webcamRef.current = new window.tmPose.Webcam(size, size, flip);
      await webcamRef.current.setup()
      await webcamRef.current.play();
    } catch {
      throw new Error('camera issue')
    }
  }

  const requestGameData = async() => {
    const params = { level: 1 }
    return dispatch(requestRandomGameByAge(params))
      .then(res => {
        if (isMount.current)
          exerciseList.current = res.payload.data
      })
      .catch(() => {throw new Error('server connection issue')})
}

  const requestProfileImage = async() => {
    return dispatch(requestSubInfo(localStorage.getItem('sub-user')))
      .then(res => {
        faceImg.current.src = res.payload.data.image
      })
      .catch(() => {throw new Error('server connection issue')})
  }

  // init()
  const init = () => {
    // getCanvas
    playBGM(intro)
    canvasRef.current.style.width = '100%';
    canvasRef.current.style.height = '100%';

    canvasRef.current.width = 800;
    canvasRef.current.height = 800;
    contextRef.current = canvasRef.current.getContext('2d');
    contextRef.current.scale(1, 1)

    // getWebcam, requestGameData
    Promise.all([startWebcam(), requestGameData(), requestProfileImage()])
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

    if (!isMount.current)
      return
    
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
    if (idx.current === 4) {
    // if (idx.current === exerciseList.current.asset.length) {
      handleEnd()
      return
    }

    switch (isStarted.current) {
      case false:
        if (!isEngaged.current) {
          isNextLoading.current = false
          successFlag.current = false
          handleStart()
        }
        break
      case true:
        await predict(posenetOutput)
          .then(res => {
            // 무조건 넘어감
            // successFlag.current = true
            if (res === true) {
              if (successFlag.current) return;
              
              successThreshold.current += 1
              if (successThreshold.current > 40) {
                successThreshold.current = 0
                successCount.current += 1
                successFlag.current = true
              }
            } else {
              if (successThreshold.current >= 1)
                successThreshold.current -= 2;
            }
          })
          .catch(err => console.log)

        // 아이참재미있다 이후
        if (audioRef.current.paused) {
          if (isNextLoading.current) return;
          isNextLoading.current = true
          
          if (!isMount.current) return;
          successFlag.current ? stepHandler(true) : stepHandler(false)            
          idx.current += 1
          setProgressData(Number((idx.current / 4).toFixed(2)) * 100)
          // setProgressData(Number((idx.current / exerciseList.current.asset.length).toFixed(2)) * 100)
          isStarted.current = false
        }
        break
      default:
    }
    isDrawing.current = false
  }

  const predict = async(posenetOutput) => {
    const prediction = await modelRef.current.predict(posenetOutput)
    const exerciseIdx = exerciseList.current.asset[idx.current].classNumber - 1
    const current = prediction[exerciseIdx]
    if (current === undefined)
      throw new Error('undefined prediction')
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

  const playBGM = (music) => {
    audioRef.current = new Audio(music)
    audioRef.current.play()
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

      let count = eyeSizeArr.current.length + 1
      let average = 0
      eyeSizeArr.current.forEach(es => {
        if (es <= 0)
          count -= 1;
        else
          average += es
      })
      eyeSize = (eyeSize + average) / count
      eyeSizeArr.current.push(eyeSize)
      eyeSizeArr.current.shift()
  
      // const minPartConfidence = 0.5
      // window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, contextRef.current);
      // window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, contextRef.current);
  
      if (pose.keypoints[0].score > 0.8) {
        contextRef.current.drawImage(
          faceImg.current,
          pose.keypoints[0].position.x - eyeSize * 2,
          pose.keypoints[0].position.y - eyeSize * 3,
          eyeSize * 5,
          eyeSize * 5,
        ) 
      }
    } catch {
      // console.log(pose)
      return
    }
  }

  const monkeys = [
    monkey1, monkey2, monkey3, monkey2
  ]
  const handleStart = async() => {
    isEngaged.current = true
    idx.current % 2 ? playBGM(interlude2) : playBGM(interlude1)

    // 동물사진넣으려면여기수정
    await (async function() {
      for (let sec = 0; sec < 4; sec++) {
        for (let i = 0; i < 4; i++) {
          if (!isMount.current)
            return
          setImage(monkeys[i]);
          await delay(250)
        }
      }
      setImage(monkey1)
    })()

    // if (!isMount.current) return;
    // setImage(doggy)

    await delay(2600)  // 4000 + 2600 = 6600
    if(!isMount.current)
      return
    setImage(`${exerciseList.current.asset[idx.current].image}`)
    playBGM(followMe)
    isStarted.current = true
    isEngaged.current = false
  }

  const delay = (t) => new Promise(resolve => {
    setTimeout(resolve, t)
  })

  useEffect(() => {
    // window.addEventListener('resize', handleResize)
    // window.removeEventListener('resize', handleResize)
    init()
    return () => {
      cancelAnimationFrame(requestRef.current)
      webcamRef.current.stop()
      audioRef.current.pause()
    }
  }, [])

  const handleEnd = () => {
    cancelAnimationFrame(requestRef.current)
    if (successCount.current >= 2) {
      dispatch(requestGameSuccessSave())
      setGameRes(1)
    }
    setEndOpen(true)    
    // webcamRef.current.stop()
  }

  const onClickGameEnd = () => {
    props.history.push('/home')
  }

  const onClickReplay = () => {
    if (!isMount.current)
      return
    idx.current = 0
    isStarted.current = false
    isEngaged.current = false
    successCount.current = 0
    successFlag.current = false
    successThreshold.current = 0
    setProgressData(0)
    setEndOpen(false)
    isDrawing.current = false
    requestRef.current = requestAnimationFrame(loop)
  }

  const stepHandler = async(res) => {
    switch(res) {
      case true:
        canvasRef.current.style.border = '10px #A3C653 solid'
        await delay(1000)
        if (!isMount.current) return
        canvasRef.current.style.border = ''
        break
      case false:
        canvasRef.current.style.border = '10px #AC3943 solid'
        await delay(1000)
        if (!isMount.current) return
        canvasRef.current.style.border = ''
        break
      default:
    }
  }
  // const handleResize = debounce(() => {
  //   console.dir(canvasRef.current)
  //   // canvasSize.current = {w: rightScreenRef.current}
  // }, 1000)

  return(
    <div className={styles.container}>
      {/* {seconds} */}
      <BackFollow />

      <Header progress={progressData} onEndgameClick={onClickGameEnd} />
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
          {/* <RightGameScreen style={successCue}> */}
          <RightGameScreen>
            <canvas ref={canvasRef} />
          </RightGameScreen>
        </Grid>
      </Grid>
      {/* send progress data as props to Header */}
      {/* <img src={baseMonkey} loop={'infinte'} width={'600px'}/> */}
      <GameStartCount open={openStartCount} text={seconds ? seconds : '시작!'} />
      
      <audio id='clear_sound' style={{display:'none'}} controls src={game_clear} > Your user agent does not support the HTML5 Audio element. </audio>
      <audio id='fail_sound' style={{display:'none'}} controls src={game_fail} > Your user agent does not support the HTML5 Audio element. </audio>

      <EndDialog open={endOpen} gameRes={gameRes} getEndClose={onClickGameEnd} getReplay={onClickReplay}/>
    </div>
  )
}