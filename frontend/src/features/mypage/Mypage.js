import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import styles from './Mypage.module.css'
import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Slider } from './slider.js'

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

export function Mypage() {
  return (
    <div className={styles.container}>
      <div style={{ textAlign: 'start', position:'absolute' }}>
        <IconButton
          aria-label="home"
          color="inherit"
          size="medium"
          sx={{backgroundColor: '#FFFFFF', border: '5px solid #A3C653', mt: 5, ml: 5}}
        >
          <HomeRoundedIcon
            fontSize="inherit"
            sx={{color: '#A3C653'}}
          />
        </IconButton>
      </div>
      <Grid container item 
        textAlign="start" justifyContent="center" alignItems="center" 
        sx={{height: '100%'}}
      >  
        <div>
          <Grid container 
            direction="column" alignItems="end"
          >
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '50px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="257" height="353">
                <path d="M 85 0.281 C 102.518 0.281 116.719 14.482 116.719 32 C 116.719 49.518 102.518 63.719 85 63.719 C 67.482 63.719 53.281 49.518 53.281 32 C 53.281 14.482 67.482 0.281 85 0.281 Z" fill="hsl(19, 100%, 70%)"></path><path d="M 85.281 0.563 C 102.799 0.563 117 14.763 117 32.281 C 117 49.799 102.799 64 85.281 64 C 67.763 64 53.563 49.799 53.563 32.281 C 53.563 14.763 67.763 0.563 85.281 0.563 Z" fill="hsl(19, 100%, 70%)"></path><path d="M 158.281 0.563 C 175.799 0.563 190 14.763 190 32.281 C 190 49.799 175.799 64 158.281 64 C 140.763 64 126.563 49.799 126.563 32.281 C 126.563 14.763 140.763 0.563 158.281 0.563 Z" fill="hsl(19, 100%, 70%)"></path><path d="M 123.65 21.301 C 164.161 21.301 197 54.14 197 94.65 C 197 135.161 164.161 168 123.65 168 C 83.14 168 50.301 135.161 50.301 94.65 C 50.301 54.14 83.14 21.301 123.65 21.301 Z" fill="hsl(19, 100%, 70%)"></path><path d="M 10.405 0 C 16.151 0 20.809 3.09 20.809 6.903 C 20.809 10.715 16.151 13.806 10.405 13.806 C 4.658 13.806 0 10.715 0 6.903 C 0 3.09 4.658 0 10.405 0 Z" transform="translate(139.916 54.085) rotate(91 10.405 6.903)" fill="hsl(19, 23%, 46%)"></path><path d="M 10.405 0 C 16.151 0 20.809 3.09 20.809 6.903 C 20.809 10.715 16.151 13.806 10.405 13.806 C 4.658 13.806 0 10.715 0 6.903 C 0 3.09 4.658 0 10.405 0 Z" transform="translate(95.832 53.171) rotate(91 10.405 6.903)" fill="hsl(19, 23%, 46%)"></path><path d="M 125.923 109.846 C 183.404 109.846 230 156.442 230 213.923 C 230 271.404 183.404 318 125.923 318 C 68.442 318 21.846 271.404 21.846 213.923 C 21.846 156.442 68.442 109.846 125.923 109.846 Z" fill="hsl(19, 100%, 70%)"></path><path d="M 232.22 141.439 C 245.906 141.439 257 152.534 257 166.22 C 257 179.906 245.906 191 232.22 191 C 218.534 191 207.439 179.906 207.439 166.22 C 207.439 152.534 218.534 141.439 232.22 141.439 Z" fill="hsl(19, 100%, 70%)"></path><path d="M 25.22 141.439 C 38.906 141.439 50 152.534 50 166.22 C 50 179.906 38.906 191 25.22 191 C 11.534 191 0.439 179.906 0.439 166.22 C 0.439 152.534 11.534 141.439 25.22 141.439 Z" fill="hsl(19, 100%, 70%)"></path><path d="M 102.22 303.439 C 115.906 303.439 127 314.534 127 328.22 C 127 341.906 115.906 353 102.22 353 C 88.534 353 77.439 341.906 77.439 328.22 C 77.439 314.534 88.534 303.439 102.22 303.439 Z" fill="hsl(19, 100%, 70%)"></path><path d="M 159.22 303.439 C 172.906 303.439 184 314.534 184 328.22 C 184 341.906 172.906 353 159.22 353 C 145.534 353 134.439 341.906 134.439 328.22 C 134.439 314.534 145.534 303.439 159.22 303.439 Z" fill="hsl(19, 100%, 70%)"></path><path d="M 126.939 72.439 C 157.039 72.439 181.439 88.333 181.439 107.939 C 181.439 127.546 157.039 143.439 126.939 143.439 C 96.839 143.439 72.439 127.546 72.439 107.939 C 72.439 88.333 96.839 72.439 126.939 72.439 Z" fill="hsl(19, 100%, 91%)"></path><path d="M 127.488 67.085 C 133.235 67.085 137.893 70.176 137.893 73.988 C 137.893 77.801 133.235 80.891 127.488 80.891 C 121.742 80.891 117.084 77.801 117.084 73.988 C 117.084 70.176 121.742 67.085 127.488 67.085 Z" fill="hsl(19, 23%, 46%)"></path>
              </svg>
              some name
            </div>
          </Grid>
        </div>
        
        <Grid container item
          xs={5} direction="column" justifyContent="center" alignItems="start"
        >
          <Paper elevation={0} sx={{width: '100%', height: '22vh',  mb: '10px'}}>
            <StarRoundedIcon fontSize={'large'} sx={{position: 'absolute', color: '#A3C653', mt: '7px', ml: '7px'}} />
            <div className={styles.progressbar__container}>
              {/* note: negative ml value === width or fontSize / 2 */}
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
          </Paper>
          <Paper elevation={0} sx={{width: '100%', height: '22vh', mt: '10px'}}>
            <ShoppingBasketIcon fontSize={'large'} sx={{position: 'absolute', color: '#A3C653', mt: '7px', ml: '7px'}} />
            <Slider />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}