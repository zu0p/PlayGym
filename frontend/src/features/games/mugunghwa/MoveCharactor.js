import React, {useEffect, useState} from 'react'
import mugunghwa from '../../../sounds/mugunghwa.mp3'

export function MoveCharactor(props){
  
  useEffect(()=>{
    var canvas = document.getElementById('screen')
    var ctx = canvas.getContext("2d")

    var imgNum = 1
    var img = document.createElement('img') //new Image()

    const GAME_CNT = 3

    const backSound = document.getElementById('back_sound')
    backSound.style.display = 'none'
    backSound.muted = false
    backSound.pause()
    let cnt = 0
    player(1)
    // 게임 시작
    setTimeout(function(){
      props.showMotion()
      backSound.play()
    }, 5000)
    setTimeout(playSequence, 7000+5000)
    

    function playSequence(){
      let isup = true
      let isstop = false

      var timer = setInterval(function (){
        if(cnt == GAME_CNT) {
          // console.log(cnt+" end")
          clearInterval(timer)
          props.getEndGame()
        }
        if(imgNum == 5) {
          // console.log("cnt: " + cnt)
          imgNum--
          isstop = true
          props.getCheckMotion()
          setTimeout(function(){
            isup = false
            isstop = false
          },3000)
          
        }
        else if(imgNum == 0){
          cnt++
          imgNum++
          isstop = true
          if(cnt != GAME_CNT){
            props.showMotion()
            backSound.play()
          }
          setTimeout(function(){
            isup = true
            isstop = false
          },7000)
        }
        if(!isstop){
          if(isup) player(imgNum++)
          else player(imgNum--)     
        } 
      }, 120)
    }

    function player(num){
      img.src = require(`../../../images/mugunghwa/stop${num}.png`).default
      img.id = 'stop'
      img.width = 500
      // console.log(num)
    }

    img.onload = function(){
      ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
      ctx.drawImage(img, -50, 0, 450, 450)
    }

  },[props.replay])

  return(
    <div>
      <canvas width='450' height='500' id='screen'></canvas>
      <audio id='back_sound' autoPlay muted controls src={mugunghwa}> Your user agent does not support the HTML5 Audio element. </audio>
    </div>
  )
}