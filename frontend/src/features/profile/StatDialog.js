import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { FullDialogBar, FullDialogGridStat } from './customProfileStyle'
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Profile.module.css';
import bear from '../../images/characters/bear.png'
import cat from '../../images/characters/cat.png'
import chick from '../../images/characters/chick.png'
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
// import rabbit from '../../images/characters/rabbit.png'

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export function StatDialog(props) {
  const [progress, setProgress] = React.useState(0);
  const handleClose = () => {
    props.getClose(true)
  }

  // 아마도 profileList를 prop으로 받아오 지 않 을 까? 모르겠네
  const [profiles, setProfiles] = useState({
    n: 3,
    // names: ['qwe', 'asd', 'zxc']
    list: [
      {name: 'qwe', kcal: '500', level: '500', pic: bear,},
      {name: 'asd', kcal: '500', level: '500', pic: cat,},
      {name: 'zxc', kcal: '500', level: '500', pic: chick,},
      // {name: 'qaz', kcal: '500', level: '500', pic: chick,},
    ]
  })
  

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <FullDialogBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Statistics
          </Typography>
        </Toolbar>
      </FullDialogBar>
      <FullDialogGridStat
        container
        direction="column"
        // justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {profiles.list.map(profile => (
          <Grid container sx={{ mt: 10, ml:4, width: '75%' }} >
            <Grid item direction="column">
              <div className={styles.player_static}>
                <img src={profile.pic} width='100px'/>
              </div>
              <Typography sx={{ textAlign: 'center'}}>
                {profile.name}
              </Typography>
            </Grid>
            <Grid item direction="column" xs container>
              <LinearProgressWithLabel value={progress} />
              <Typography>
                총 소모한 칼로리: {profile.kcal}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </FullDialogGridStat>
    </Dialog>
  )
}