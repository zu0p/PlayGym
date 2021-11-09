import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestMugunghwaGame } from "../../../app/actions/userActions";
import Grid from "@mui/material/Grid";
import { MoveCharactor } from "./MoveCharactor";
import { BeforeStart } from "../BeforeStart";
import styles from "./Mugunghwa.module.css";
import MotionDialog from "./MotionDialog";
import m_text from "../../../images/mugunghwa/m_text.png";
import GameHeader from "../gameHeader";

const size = 800;
const width = 200;
const height = 500;
const flip = true;
const faceImg = new Image();
faceImg.src = "http://k5d205.p.ssafy.io:8080/img/bear.png";

export function Mugunghwa(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const webcamRef = useRef(null);
  const requestRef = useRef(null);
  const modelRef = useRef(null);
  const successThreshold = useRef(0);

  const checkbody = useRef(0);
  const checkperf = useRef(0);

  const dispatch = useDispatch();
  const [dummyProgressData, setDummyProgressData] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [openStartCount, setOpenStartCount] = useState(false);
  // const [exerciseList, setExerciseList] = useState([])
  const exerciseList = useRef([]);
  const [meta, setMeta] = useState("");
  const [model, setModel] = useState("");

  const startWebcam = async () => {
    try {
      webcamRef.current = new window.tmPose.Webcam(size, size, flip);
      await webcamRef.current.setup();
      await webcamRef.current.play();
    } catch {
      throw new Error("camera issue");
    }
    // webcamRef.current.update();
  };

  // const requestGameData = async() => {
  //   const params = {
  //     level: 1,
  //   }
  //   dispatch(requestMugunghwaGame(params))
  //     .then(res => {
  //       console.log(res)
  //       exerciseList.current = res.payload.data.asset
  //       setMeta(res.payload.data.metaLink)
  //       setModel(res.payload.data.modelLink)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //       // throw new Error('server connection issue')
  //     })
  // }

  // init()
  // const init = () => {
  //   // getCanvas
  //   canvasRef.current.width = width;
  //   canvasRef.current.height = height;
  //   contextRef.current = canvasRef.current.getContext('2d');
  //   // getWebcam, requestGameData
  //   Promise.all([startWebcam(), requestGameData()])
  //     .then(() => {
  //       iterExercise()
  //     })  // start iterating
  //     .catch(err => console.log(err.message))  // do sth! e.g.) redirection / alert / re-request
  // }

  // useEffect(async()=>{
  //   console.log(meta+" "+model)
  //   modelRef.current = await window.tmPose.load(model, meta)
  //   requestRef.current = requestAnimationFrame(loop)
  // }, [meta, model])

  const iterExercise = async () => {
    // console.log(exerciseList.current.length)
    // for (let i = 0; i < exerciseList.current.length; i++) {
    //   console.log(exerciseList.current[i])
    // let exercise = exerciseList.current[i].execSub;
    // for (let j = 0; j < exercise.length; j++) {
    //   if (exercise[j].modelLink === null) {
    //     console.log('@@ null modelLink continue @@')
    //     continue
    //   }
    //   console.log('iteration started')
    //   let modelURL = exercise[j].modelLink;
    //   let metadataURL = exercise[j].metaLink;
    //   setMotionImg(`${exercise[j].imgLink}`)
    //   modelRef.current = await window.tmPose.load(modelURL, metadataURL)
    //   // let maxPredictions = modelRef.current.getTotalClasses()
    //   // code here to handle start
    //   requestRef.current = requestAnimationFrame(loop)
    // }
    // }
    // console.log(model + " " + meta)
    // let modelURL = model
    // let metadataURL = meta
    // setMotionImg(`${exercise[j].imgLink}`)
    // modelRef.current = await window.tmPose.load(modelURL, metadataURL)
    // requestRef.current = requestAnimationFrame(loop)
  };

  const loop = async (timestamp) => {
    console.log("loop");
    webcamRef.current.update();
    await predict().then((res) => {
      if (res === true) {
        successThreshold.current += 1;
        if (successThreshold.current > 10) console.log("success");
        else requestRef.current = requestAnimationFrame(loop);
      } else {
        if (successThreshold.current > 0) successThreshold.current -= 2;
        requestRef.current = requestAnimationFrame(loop);
      }
    });
  };

  const predict = async () => {
    // console.log(`predict ${canvasRef.current}`)
    const { pose, posenetOutput } = await modelRef.current.estimatePose(
      webcamRef.current.canvas
    );
    const prediction = await modelRef.current.predict(posenetOutput);

    if (prediction[0].probability.toFixed(2) > 0.8) return true;
    else {
      drawPose(pose);
      return false;
      // throw new Error('wrong pose')
    }
  };

  const checkPose = async (pose) => {
    // catch
    if (pose === null) throw new Error("Nullpose");

    if (pose.keypoints.length < 16) throw new Error("Unrecognizable");

    // then => true || false
    const keypoints = pose.keypoints.slice(5, 15);
    return keypoints.every((p) => p > 0.5);
  };

  const drawPose = (pose) => {
    if (pose === null || undefined) return;

    if (!webcamRef.current.canvas) return;

    contextRef.current.drawImage(webcamRef.current.canvas, 0, 0);
    let eyeSize = Math.sqrt(
      Math.pow(pose.keypoints[1].position.x - pose.keypoints[2].position.x, 2) +
        Math.pow(pose.keypoints[1].position.y - pose.keypoints[2].position.y, 2)
    );

    const minPartConfidence = 0.5;
    window.tmPose.drawKeypoints(
      pose.keypoints,
      minPartConfidence,
      contextRef.current
    );
    window.tmPose.drawSkeleton(
      pose.keypoints,
      minPartConfidence,
      contextRef.current
    );

    if (pose.keypoints[0].score > 0.8) {
      contextRef.current.drawImage(
        faceImg,
        pose.keypoints[0].position.x - eyeSize * 2,
        pose.keypoints[0].position.y - eyeSize * 3,
        eyeSize * 5,
        eyeSize * 5
      );
    }
  };

  useEffect(() => {
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    contextRef.current = canvasRef.current.getContext("2d");
    console.log(canvasRef);

    const params = {
      level: 1,
    };
    dispatch(requestMugunghwaGame(params))
      .then(async (res) => {
        console.log(res);
        exerciseList.current = res.payload.data.asset;

        modelRef.current = await window.tmPose.load(
          res.payload.data.modelLink,
          res.payload.data.metaLink
        );
        startWebcam().then(() => {
          console.log(modelRef);
          requestRef.current = requestAnimationFrame(loop);
        });
      })
      .catch((e) => {
        console.log(e);
        // throw new Error('server connection issue')
      });

    // init()
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // 현재 위치 나타내기 위한 변수
  const [move, setMove] = useState(-1);

  // 따라하기 위한 이미지 팝업으로 보여주기 위한 플래그
  const [imgOpen, setImgOpen] = useState(false);

  // 따라하기 위한 이미지 api로 받아와서 img src를 팝업에 넘겨주기 위한 변수
  const [motionImg, setMotionImg] = useState("");

  // 총 게임 카운트(설정해둔 전체 루프)가 끝나면 MoveCharactor.js에서 호출하는 함수
  const onEndGame = () => {
    console.log("game end");
  };

  // MoveCharactor.js에서 한 턴이 끝나면 onCheckMotion()을 호출하고
  // onCheckMotion()에서 모션 성공 시 다음칸으로 넘어가기 위해 setMove 하면
  // 실제로 move 변경을 감지하고 webcam이동
  useEffect(() => {
    console.log(move);

    if (move >= 0 && move < 4) {
      // console.log(webcamRef)
      cancelAnimationFrame(requestRef.current);
      console.log("stop!!!!!loop");

      const before = document.getElementById(`box${move}`);
      const after = document.getElementById(`box${move + 1}`);

      before.innerHTML = "";
      const user = document.createElement("div");
      user.id = "webcam";
      user.className = styles.userBox;
      console.log("canvas: " + canvasRef);
      user.innerHTML = `<canvas id="canvas" ref=${canvasRef}/>`;
      after.appendChild(user);
      // const before = document.getElementById(`webcam${move}`)
      // const after = document.getElementById(`webcam${move+1}`)

      // before.style.display = 'none'
      // after.style.display = 'block'

      // init()
      const canvas = document.getElementById("canvas");
      canvas.width = size;
      canvas.height = size;
      contextRef.current = canvas.getContext("2d");
      // canvasRef.current.width = width;
      // canvasRef.current.height = height;
      contextRef.current = canvasRef.current.getContext("2d");
      startWebcam().then(() => {
        // console.log(modelRef)
        requestRef.current = requestAnimationFrame(loop);
      });
      // requestRef.current = requestAnimationFrame(loop)
    }
  }, [move]);

  const onChcekMotion = () => {
    let check = true; // 추후 모선이 성공했는지 여부를 함수로 return 받기

    if (check) {
      // 자세 통과
      setTimeout(function () {
        setMove((move) => move + 1);
      }, 4000);
    }
  };

  // MoveCharactor.js에서 한 턴이 시작됨을 알리면서 호출하는 함수
  // 새로운 턴이 시작되면 수행해야할 동작 img를 api로 받아서 setMotionImg로 설정하고
  // setImgOpen을 true로 설정해 따라할 동작을 팝업으로 띄움
  const onShowMotion = () => {
    setMotionImg((motionImg) => motionImg + "a");
    setImgOpen(true);
  };

  const onGetClose = () => {
    setImgOpen(false);
  };

  // 게임종료 버튼 클릭시 핸들러
  const endGame = () => {
    // props.history.push('/home')
    window.location = "/home";
  };

  return (
    <div className={styles.mugunghwa_container}>
      <GameHeader progress={move} onEndgameClick={endGame} />
      <BeforeStart />
      <Grid
        container
        // direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={12} mt={"50px"}>
          <img src={m_text} width={400} />
        </Grid>
        <Grid item md={2} className={styles.goalLine}>
          <MoveCharactor
            getEndGame={onEndGame}
            getCheckMotion={onChcekMotion}
            showMotion={onShowMotion}
          />
        </Grid>

        <Grid item md={2} className={styles.nomalLine} id="box4">
          {/* <div id='webcam4' className={styles.userBox} >
            <canvas ref={canvasRef}/>
          </div> */}
        </Grid>

        <Grid item md={2} className={styles.stepLine} id="box3">
          {/* <div id='webcam3' className={styles.userBox} >
            <canvas ref={canvasRef}/>
          </div> */}
        </Grid>

        <Grid item md={2} className={styles.stepLine} id="box2">
          {/* <div id='webcam2' className={styles.userBox} >
            <canvas ref={canvasRef}/>
          </div> */}
        </Grid>

        <Grid item md={2} className={styles.stepLine} id="box1">
          {/* <div id='webcam1' className={styles.userBox} >
            <canvas ref={canvasRef}/>
          </div> */}
        </Grid>

        <Grid item md={2} className={styles.stepLine} id="box0">
          <div id="webcam0" className={styles.userBox}>
            <canvas id="canvas" ref={canvasRef} />
          </div>
        </Grid>
      </Grid>

      <MotionDialog open={imgOpen} img={motionImg} getClose={onGetClose} />
    </div>
  );
}
