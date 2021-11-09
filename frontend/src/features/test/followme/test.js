import { useEffect, useRef, useState } from "react"
import { Route, Link, NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import styles from '../Games.module.css'
import Header from '../gameHeader'
import LeftGameScreen from './LeftGameScreen'
import RightGameScreen from './RightGameScreen'
import f_text from '../../../images/followMe/f_text.png'
import baseMonkey from '../../../images/games/base_monkey.gif'

export default function Test(props) {
  const [image, setImage] = useState(baseMonkey)
  const canvasRef = useRef(null)
  return (    
  <div className={styles.container}>
    {/* {seconds} */}

    <Header/>
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
        {/* <canvas ref={canvasRef} /> */}
        <RightGameScreen>
          <canvas ref={canvasRef} />
        </RightGameScreen>
      </Grid>
    </Grid>
  </div>
)
}