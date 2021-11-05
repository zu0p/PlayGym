import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles';
import styles from './Games.module.css'
import Typography from '@mui/material/Typography';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import Grid from '@mui/material/Grid';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';

const BorderLinearProgress = styled(LinearProgress)(_ => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#eeeeee'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#FAA085'
  },
}));

export default function GameHeader(props) {
  return(
    <div className={styles.header}>
      <Grid container justifyContent="start" alignItems="center">
        <Grid item xs={1}>
          <IconButton 
            onClick={props.onEndgameClick} 
            className={styles.exit_btn}
            // style={{
            //   color: '#AC3943',
            //   backgroundColor: 'white',
            //   position: 'fixed',
            //   top: '10px',
            //   left: '10px',
            //   zIndex: '100',
            //   width: '40px',
            //   height: '40px'
            // }}
            >
            <ClearRoundedIcon fontSize="large"/>
          </IconButton>
          </Grid>
        <Grid item xs={5}>
          <div className={styles.progressbar__container}>
                  {/* note: negative ml value === width or fontSize / 2 */}
            {/* <Typography sx={{width: '40px', zIndex: 40, fontSize: '30px', color: '#000', gridArea: '1/2/2/3', ml: '-20px'}}>
            </Typography>
            <Typography sx={{width: '40px', zIndex: 40, fontSize: '15 px', color: '#000', gridArea: '1/6/2/7', ml: '-20px'}}>
              Goal
            </Typography> */}
            <DirectionsRunRoundedIcon sx={{fontSize: '50px', color: '#22220B', zIndex: 30, gridArea: '1/2/2/3', ml: '-25px'}} />
            <AssistantPhotoRoundedIcon sx={{fontSize: '50px', color: '#E8C517', zIndex: 30, gridArea: '1/6/2/7', ml: '-25px'}} />
            <BorderLinearProgress sx={{gridArea: '1/2/2/6', zIndex: 20, height: '15px'}} variant="determinate" value={props.progress} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}