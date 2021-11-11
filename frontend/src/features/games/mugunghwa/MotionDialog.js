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
      <Dialog open={props.open} className={styles.img_popup}>
        <DialogContent style={{height: '480px', width: '400px'}}>
          <Grid 
            container 
            // spacing={4} 
            // mt={'5px'}           
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <img src={flower_l} width={'100px'} style={{position: 'absolute', top: '10px', left:'340px'}}/>
            <img src={flower_r} width={'100px'} style={{position: 'absolute', top:'400px', left:'5px'}}/>
            <Grid item style={{height:'400px'}}>
              <img id='myImg' src={props.img} width={'380px'}/>
            </Grid>
            <Grid item id='text'><h3>동작을 잘 보고 따라하세요</h3></Grid>
            
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}