import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Grid } from '@mui/material'
import success from '../../../images/mugunghwa/success.png'
import fail from '../../../images/mugunghwa/fail.png'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import IconButton from '@mui/material/IconButton'

export default function EndDialog(props) {
  
  const onClose = () => {
    props.getEndClose(true)
  }
  const onReplay = () => {
    props.getReplay()
  }
  return (
    <div>
      <Dialog open={props.open} >
        <DialogContent style={{height: '400px', width: '600px', padding: 0}}>
          <Grid 
            container 
            mt={'5px'}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item md={12} style={{textAlign: 'center'}}>
              <h1> {props.gameRes === 1 ? '성공!' : '실패'} </h1>
            </Grid>
            <Grid item>
              <img src={props.gameRes === 1 ? success : fail} width='300px' alt="" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={onReplay}>
            <ReplayRoundedIcon fontSize="large" color="info"/>
          </IconButton>
          <IconButton onClick={onClose}>
            <SportsEsportsRoundedIcon fontSize="large" color="action" />
          </IconButton>
          {/* <AddButton id={'add-button'} onClick={onAdd} disabled={add}>Add</AddButton> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}