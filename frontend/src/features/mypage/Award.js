import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import rewardOpen from '../../images/reward_open.gif'
import styles from './Mypage.module.css'

export default function Award(props) {  
  const onClose = () => {
    props.getEndClose(true)
  }
  // const onReplay = () => {
  //   props.getReplay()
  // }
  return (
    <div>
      <Dialog 
        open={props.open} 
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent style={{height: '600px', width: '600px', padding: 0}}>
          <Grid 
            container 
            mt={'5px'}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item style={{position: 'relative', textAlign: 'center'}}>
              <img id='openImg' src={rewardOpen} width={'500px'}onClick={onClose}/>
              <div className={styles.title}>
                {props.title}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}