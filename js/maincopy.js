const video5 = document.getElementsByClassName("input_video5")[0];
const out5 = document.getElementsByClassName("output5")[0];
const controlsElement5 = document.getElementsByClassName("control5")[0];
const canvasCtx5 = out5.getContext("2d");

const fpsControl = new FPS();
// ,{"img":null,"name":"스쿼트","count":"5","rightArm":0,"leftArm":0,"rightlag":100,"leftlag":100,"bodyandlag":0,"armpitD":0,"armpitU":170,"x1":null,"x2":null}

const exc = JSON.parse(JSON.stringify(excresult));
// console.log(exc);
const spinner = document.querySelector(".loading");
spinner.ontransitionend = () => {
  spinner.style.display = "none";
};

function zColor(data) {
  const z = clamp(data.from.z + 0.5, 0, 1);
  return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
}

function lagAngles(a, b, c, d) {
  let first = a;
  let midx = (b.x + c.x) / 2;
  let midy = (b.y + c.y) / 2;
  let end = d;

  let radians =
    Math.atan2(first.y - midy, first.x - midx) -
    Math.atan2(end.y - midy, end.x - midx);
  let angle = Math.abs(radians * (180 / Math.PI));

  if (angle > 180.0) {
    angle = 360 - 180;
  }

  return angle;
}
function DistancetwoPoint(a, b) {
  if (a == null || b == null) {
    return 1;
  }
  console.log(a.x, "/", b.x, "/", a.y, "/", b.y);
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
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

async function check(Landmarks, x) {
  if (Landmarks == null) {
    return 180;
  }
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

  if (exc[x].LsideD != 0) {
    angle = pointAngles(Landmarks[12], Landmarks[24], Landmarks[26]);
    console.log("Lside: ", angle);
    if (angle <= exc[x].LsideD && angle > exc[x].LsideU) {
    } else {
      flag = 1;
    }
  }

  if (exc[x].RsideD != 0) {
    angle = pointAngles(Landmarks[11], Landmarks[23], Landmarks[25]);
    console.log("Rside: ", angle);
    if (angle <= exc[x].RsideD && angle > exc[x].RsideU) {
    } else {
      flag = 1;
    }
  }
  if (exc[x].RlagD != 0) {
    angle = pointAngles(Landmarks[24], Landmarks[23], Landmarks[25]);
    console.log("lag : ", angle);
    if (angle <= exc[x].RlagD && angle > exc[x].RlagU) {
    } else {
      flag = 1;
    }
  }

  if (exc[x].LlagD != 0) {
    angle = pointAngles(Landmarks[23], Landmarks[24], Landmarks[26]);
    console.log("lag : ", angle);
    if (angle <= exc[x].LlagD && angle > exc[x].LlagU) {
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

  if (exc[x].leftlagD != 0) {
    angle = pointAngles(Landmarks[23], Landmarks[25], Landmarks[27]);
    console.log("leftlag: ", angle);
    if (angle <= exc[x].leftlagD && angle > exc[x].leftlagU) {
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
    console.log(
      exc[x].x1,
      Landmarks[exc[x].x1].x,
      " : ",
      exc[x].x2,
      Landmarks[exc[x].x2].x
    );

    if (Landmarks[exc[x].x1].x < Landmarks[exc[x].x2].x) {
    } else {
      flag = 1;
    }
  }

  if (exc[x].y1 != null) {
    console.log(
      exc[x].y1,
      Landmarks[exc[x].y1].y,
      " : ",
      exc[x].y2,
      Landmarks[exc[x].y2].y
    );
    if (Landmarks[exc[x].y1].y < Landmarks[exc[x].y2].y) {
    } else {
      flag = 1;
    }
  }
  if (exc[x].disD != 0) {
    let distance = DistancetwoPoint(
      Landmarks[exc[x].dp1],
      Landmarks[exc[x].dp2]
    );
    console.log("dis: ", distance);
    if (distance <= exc[x].disD && distance > exc[x].disU) {
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
let s;

async function onResultsPose(results) {
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

  // if (statusExc == "down" && check(Landmarks, order)) {
  //   statusExc = "up";
  // } else if (statusExc == "up" && !check(Landmarks, order)) {
  //   _.debounce(() => {
  //     count++;
  //     statusExc = "down";
  //     console.log("count : ", count);
  //   }, 1000);
  //   // count++;
  // }

  if (statusExc == "down" && (await check(Landmarks, order))) {
    statusExc = "up";
  } else if (statusExc == "up" && !(await check(Landmarks, order))) {
    // _.debounce(() => {
    //   count++;
    //   statusExc = "down";
    //   console.log("count : ", count);
    // }, 500);
    count++;
    statusExc = "down";
    console.log("count : ", count);
  }

  if (count >= exc[order].count) {
    if (exc.length == order + 1) {
      cancelAnimationFrame(s);
    } else {
      // console.log(s);
      console.log("한세트 3초쉬기");
      count = 0;
      setTimeout(() => {
        count = 0;
        order++;
      }, 3000);
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
