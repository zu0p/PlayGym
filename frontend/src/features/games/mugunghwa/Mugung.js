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
let modelURL, metaURL;
let model, maxPredictions, webcam, ctx, labelContainer;
let count = 0;
const stylecss = { height: "500px", background: "orange" };
const stylecss2 = { height: "500px", background: "blue" };
export function Mugung(props) {
  const init = async () => {
    count++;
    console.log(count);
    console.log(metaURL, " ", modelURL);
    let box = document.getElementById(`box${count}`);
    if (count > 1 && count < 5) {
      let box2 = document.getElementById(`box${count - 1}`);
      box2.innerHTML = "";
    }

    box.innerHTML = `<canvas id="canvas"></canvas>`;

    await webcam.setup();
    await webcam.play();

    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
    requestAnimationFrame(loop);
  };

  const loop = async () => {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // finally draw the poses
    drawPose(pose);
  };

  const drawPose = async (pose) => {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  };

  useEffect(async () => {
    modelURL = "http://k5d205.p.ssafy.io:8080/model/followme_level1/model.json";
    metaURL =
      "http://k5d205.p.ssafy.io:8080/model/followme_level1/metadata.json";
    model = await window.tmPose.load(modelURL, metaURL);
    webcam = new window.tmPose.Webcam(size, size, flip);
    maxPredictions = model.getTotalClasses();
  }, []);

  return (
    <div>
      <div>Teachable Machine Pose Model</div>
      <button type="button" onClick={init}>
        Start
      </button>
      <button type="button" onclick={init}>
        test
      </button>
      <div id="box1" style={stylecss}></div>
      <div id="box2" style={stylecss2}></div>
      <div id="box3" style={stylecss2}></div>
      <div id="box4" style={stylecss2}></div>
      <div id="box5" style={stylecss2}></div>
      <div id="label-container"></div>
    </div>
  );
}
