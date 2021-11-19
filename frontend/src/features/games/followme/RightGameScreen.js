import Paper from '@mui/material/Paper';

export default function RightGameScreen(props) {
  return (
    <Paper sx={{height: '66vh'}}>
      {props.children}
    </Paper>
  )
}