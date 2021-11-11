import Paper from '@mui/material/Paper';


export default function LeftGameScreen(props) {
  return (
    <Paper sx={{height: '66vh'}}>
      <img src={props.img} alt="" 
        style={{width: '100%', height: '100%', objectFit: 'contain'}}
        />
    </Paper>
  )
}