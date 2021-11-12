import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { FullDialogBar, FullDialogGrid } from './customProfileStyle'
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Profile.module.css';
import bear from '../../images/characters/bear.png'
import cat from '../../images/characters/cat.png'
import chick from '../../images/characters/chick.png'
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useDispatch } from 'react-redux';
import { requestChildrenStatus } from '../../app/actions/userActions'

// import rabbit from '../../images/characters/rabbit.png'

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
    props.getClose()
  }

  // 아마도 profileList를 prop으로 받아오 지 않 을 까? 모르겠네
  const [profiles, setProfiles] = useState(null)
  // ({
  //   n: 3,
  //   // names: ['qwe', 'asd', 'zxc']
  //   list: [
  //     {name: 'qwe', kcal: '500', level: '500', pic: bear,},
  //     {name: 'asd', kcal: '500', level: '500', pic: cat,},
  //     {name: 'zxc', kcal: '500', level: '500', pic: chick,},
  //     // {name: 'qaz', kcal: '500', level: '500', pic: chick,},
  //   ]
  // })
  
  const dispatch = useDispatch()
  useEffect(()=>{
    if(props.open){
      dispatch(requestChildrenStatus(localStorage.getItem('main-user')))
        .then(res=>{
          // console.log(res.payload.data.result.subusers)
          setProfiles(res.payload.data.result.subusers)
        })
    }
  },[props.open])

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <FullDialogBar sx={{ position: 'fixed' }}>
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
      <FullDialogGrid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        id='statContainer'
        style={{height: 'auto'}}
      >        
        {profiles===null?'empty':profiles.map(profile => (
          <Grid container sx={{ mt: 10, ml:4, width: '75%' }} key={profile.name} >
            <Grid direction="column" container item xs={4} alignItems="end">
              <div>
                <div className={styles.player_static}>
                  <img src={profile.img} width='100px'/>
                </div>
                <Typography sx={{ textAlign: 'center'}}>
                  {profile.name}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8} container>
              <Grid item container direction="column" xs={6} justifyContent="space-around">
                <div>
                  <Typography sx={{fontSize: '30px', textAlign:"center"}}>소모한 칼로리 {profile.kcal}kcal</Typography>
                </div>
                <Grid item>
                  <div className={styles.progressbar__container}>
                    <Typography sx={{width: '40px', zIndex: 40, fontSize: '30px', color: '#000', gridArea: '1/2/2/3', ml: '-20px'}}>
                      1
                    </Typography>
                    <Typography sx={{width: '40px', zIndex: 40, fontSize: '30px', color: '#000', gridArea: '1/6/2/7', ml: '-20px'}}>
                      1
                    </Typography>
                    <StarRoundedIcon sx={{fontSize: '100px', color: '#F5EAB3', zIndex: 30, gridArea: '1/2/2/3', ml: '-50px'}} />
                    <StarRoundedIcon sx={{fontSize: '100px', color: '#E8C517', zIndex: 30, gridArea: '1/6/2/7', ml: '-50px'}} />
                    <BorderLinearProgress sx={{gridArea: '1/2/2/6', zIndex: 20}} variant="determinate" value={50} />
                  </div>
                </Grid>
              </Grid>
              <Grid item container direction="column" xs={3} justifyContent="space-around">
                <Typography sx={{fontSize: '30px'}}></Typography>
                <Typography sx={{fontSize: '30px'}}>레벨 2000</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </FullDialogGrid>
    </Dialog>
  )
}