const video5 = document.getElementsByClassName("input_video5")[0];
const out5 = document.getElementsByClassName("output5")[0];
const controlsElement5 = document.getElementsByClassName("control5")[0];
const canvasCtx5 = out5.getContext("2d");

const fpsControl = new FPS();
// ,{"img":null,"name":"스쿼트","count":"5","rightArm":0,"leftArm":0,"rightlag":100,"leftlag":100,"bodyandlag":0,"armpitD":0,"armpitU":170,"x1":null,"x2":null}
const str =
  '{"result":[{"img":null,"name":"v-자세","count":"5","rightArmD":0,"rightArmU":0,"leftArm":0,"rightlagD":0,"rightlagU":0,"leftlag":0,"bodyU":0,"bodyD":0,"bodyandlag":85,"armpitD":0,"armpitU":0,"x1":11,"x2":23,"y1":null,"y2":null},' +
  '{"img":null,"name":"브릿지자세","count":"5","rightArmD":0,"rightArmU":0,"leftArm":0,"rightlagD":80,"rightlagU":70,"leftlag":0,"bodyandlag":0,"armpitD":30,"armpitU":20,"bodyU":179,"bodyD":180,"x1":12,"x2":24,"y1":12,"y2":24},' +
  '{"img":null,"name":"프랭크","count":"5","rightArmD":80,"rightArmU":60,"leftArm":0,"rightlagD":180,"rightlagU":170,"leftlag":0,"bodyandlag":0,"armpitD":85,"armpitU":70,"bodyU":179,"bodyD":180,"x1":null,"x2":null,"y1":null,"y2":null}]}';
const json = JSON.parse(str);
const exc = json.result;
const spinner = document.querySelector(".loading");
spinner.ontransitionend = () => {
  spinner.style.display = "none";
};

function zColor(data) {
  const z = clamp(data.from.z + 0.5, 0, 1);
  return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
}

function pointAngles(a, b, c) {
  // if (a.visibility < 0.8 || b.visibility < 0.8 || c.visibility < 0.8) {
  //   return 180;
  // }
  // let firstx = a.x * a.z + 480 / 2;
  // let firsty = a.y * a.z + 480 / 2;
  // let midx = b.x * b.z + 480 / 2;
  // let midy = b.y * b.z + 480 / 2;
  // let endx = c.y * c.z + 480 / 2;
  // let endy = c.y * c.z + 480 / 2;

  let first = a;
  let mid = b;
  let end = c;

  // let radians =
  //   Math.atan2(firsty - midy, firstx - midx) -
  //   Math.atan2(endy - midy, endx - midx);
  let radians =
    Math.atan2(first.y - mid.y, first.x - mid.x) -
    Math.atan2(end.y - mid.y, end.x - mid.x);
  let angle = Math.abs(radians * (180 / Math.PI));

  if (angle > 180.0) {
    angle = 360 - 180;
  }

  return angle;
}

function check(Landmarks, x) {
  let flag = 0;
  let angle;
  if (exc[x].bodyD != 0) {
    angle = pointAngles(Landmarks[12], Landmarks[24], Landmarks[26]);
    console.log("body: ", angle);
    if (angle <= exc[x].bodyD && angle > exc[x].bodyU) {
    } else {
      flag = 1;
    }
  }
  if (exc[x].rightArmD != 0) {
    angle = pointAngles(Landmarks[11], Landmarks[13], Landmarks[15]);
    console.log("rightArm: ", angle);
    if (angle <= exc[x].rightArmD && angle > exc[x].rightArmU) {
    } else {
      flag = 1;
    }
  }

  if (exc[x].leftArm != 0) {
    angle = pointAngles(Landmarks[12], Landmarks[14], Landmarks[16]);
    console.log("leftArm: ", angle);
    if (angle < exc[x].leftArm) {
    } else {
      flag = 1;
    }
  }
  if (exc[x].rightlagD != 0) {
    angle = pointAngles(Landmarks[24], Landmarks[26], Landmarks[28]);
    console.log("rightlag: ", angle);
    if (angle <= exc[x].rightlagD && angle > exc[x].rightlagU) {
    } else {
      flag = 1;
    }
  }

  if (exc[x].leftlag != 0) {
    angle = pointAngles(Landmarks[23], Landmarks[25], Landmarks[27]);
    console.log("leftlag: ", angle);
    if (angle <= exc[x].leftlag && angle > 20) {
    } else {
      flag = 1;
    }
  }

  if (exc[x].bodyandlag != 0) {
    angle = pointAngles(Landmarks[12], Landmarks[24], Landmarks[28]);
    console.log("bodyandlag: ", angle);
    if (angle <= exc[x].bodyandlag) {
    } else {
      flag = 1;
    }
  }

  if (exc[x].armpitD != 0) {
    angle = pointAngles(Landmarks[24], Landmarks[12], Landmarks[14]);
    console.log("armpit: ", angle);
    if (angle <= exc[x].armpitD && angle > exc[x].armpitU) {
    } else {
      flag = 1;
    }
  }

  if (exc[x].x1 != null) {
    if (exc[x].x1 < exc[x].x2) {
    } else {
      flag = 1;
    }
  }

  if (exc[x].y1 != null) {
    if (exc[x].y1 < exc[x].y2) {
    } else {
      flag = 1;
    }
  }
  if (exc[x].z1 != null) {
    if (exc[x].z1 < exc[x].z2) {
    } else {
      flag = 1;
    }
  }
  if (flag == 0) {
    return true;
  } else {
    return false;
  }
}
let statusExc = "down";
let count = 0;
let frogExc = false;
let countfrog = 0;
let order = 0;
let ani = null;
let countdown = 3;
function onResultsPose(results) {
  canvasCtx5.save();
  canvasCtx5.clearRect(0, 0, out5.width, out5.height);
  canvasCtx5.drawImage(results.image, 0, 0, out5.width, out5.height);
  // console.log(results);
  const Landmarks = results.poseLandmarks;
  console.log(Landmarks);
  console.log(
    "count: ",
    count,
    " status: ",
    statusExc,
    " exc: ",
    exc[order].name
  );

  if (statusExc == "down" && check(Landmarks, order)) {
    statusExc = "up";
  } else if (statusExc == "up" && !check(Landmarks, order)) {
    count++;

    statusExc = "down";
    console.log("count : ", count);
  }

  if (count >= exc[order].count) {
    if (exc.length == order + 1) {
      cancelAnimationFrame(ani);
    } else {
      order++;
      count = 0;
      setTimeout(() => {}, 3000);
    }
  }

  drawConnectors(canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
    color: "#61FFF3",
    lineWidth: 4,
  });
  drawLandmarks(canvasCtx5, results.poseLandmarks, {
    color: "#61FFF3",
    lineWidth: 2,
  });
  canvasCtx5.restore();
}

const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
  },
});
pose.setOptions({
  selfieMode: true,
  upperBodyOnly: false,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
pose.onResults(onResultsPose);

const camera = new Camera(video5, {
  onFrame: async () => {
    await pose.send({ image: video5 });
  },
  width: 480,
  height: 480,
});
camera.start();
