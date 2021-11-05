import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grow from '@mui/material/Grow';
// import Zoom from '@mui/material/Zoom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

export default function GameStartCount(props) {
  const { open, text } = props

  return (
    <Dialog open={open} PaperProps={{ style: {backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: 'none'} }} TransitionComponent={Transition} sx={{borderRadius: '50%'}}>
      <DialogContent>
          <DialogContentText sx={{ color: '#ED4502', fontSize: '50px', borderRadius: '500px', backgroundColor: '#FFF', paddingX: '23.36px'}}>
            { text }
          </DialogContentText>
        </DialogContent>
    </Dialog>
  )
}