import * as React from 'react'
import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { Grid, Select } from '@mui/material'
import styles from './Mugunghwa.module.css'
import flower_l from '../../../images/mugunghwa/flower_l.png'
import flower_r from '../../../images/mugunghwa/flower_r.png'

export default function MotionDialog(props) {
  // const [cnt, setCnt] = useState(3)
  useEffect(()=>{
    let cnt = 5
    if(props.open){
      let timer = setInterval(function(){
        const dom = document.getElementById('text')
        // console.log(cnt)
        if(cnt == 0){
          clearInterval(timer)
          props.getClose(true)
        }
        cnt--
      }, 1000)
    }
  }, [props.open])
  
  return (
    <div>
      <Dialog open={props.open} style={{width: '650px !important'}}>
        <DialogContent style={{height: '700px', width: '600px', padding: '0'}}>
          <Grid 
            container 
            // spacing={4} 
            // mt={'5px'}           
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <img src={flower_l} width={'100px'} style={{position: 'absolute', top: '10px', left:'500px', zIndes:20}}/>
            </Grid>
            <Grid item style={{width:'600px'}}>
              <img src={props.img} width={'600px'}/>
            </Grid>
            <Grid item>
              <img src={flower_r} width={'100px'} style={{position: 'absolute', top:'600px', left:'5px', zIndes:20}}/>
            </Grid>
            {/* <img src={flower_l} width={'100px'} style={{position: 'absolute', top: '10px', left:'500px', zIndes:20}}/>
            <img src={flower_r} width={'100px'} style={{position: 'absolute', top:'600px', left:'5px', zIndes:20}}/> */}
            
            <Grid item id='text'><h3>동작을 잘 보고 따라하세요</h3></Grid>
            
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}