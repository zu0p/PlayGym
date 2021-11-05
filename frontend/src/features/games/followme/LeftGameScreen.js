import baseMonkey from '../../../images/games/base_monkey.gif'
import Paper from '@mui/material/Paper';


export default function LeftGameScreen() {
  return (
    <Paper sx={{height: '66vh'}}>
      <img src={baseMonkey} alt="no img" 
        style={{width: '100%', height: '100%', objectFit: 'contain'}}
        />
    </Paper>
  )
}