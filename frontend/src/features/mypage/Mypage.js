import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import styles from './Mypage.module.css'
import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Grid from '@mui/material/Grid';
import CharacterSlide from "./characterSlide";
import RewardSlide from "./rewardSlide";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Slider } from './slider.js'
import { useDispatch } from 'react-redux';
import { requestAllCharacters, requestMypageInfo } from '../../app/actions/userActions';
import useIsMount from '../../utils/useIsMount';

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

export function Mypage(props) {
  const profileId = localStorage.getItem('sub-user')
  const dispatch = useDispatch()
  const isMount = useIsMount()
  
  const [info, setInfo] = useState({
    img: '',
    level: 0,
    nickname: '',
    exp: 0,
    max: 0,
  })
  const [total, setTotal] = useState(1)
  const [rewards, setRewards] = useState([])
  const [characters, setCharacters] = useState([])
  const [dummyReward, setDummyReward] = useState([])
  

  const getAllCharacters = async() => {
    return dispatch(requestAllCharacters())
      .then(res => res.payload.data)
  }
  const getMypageInfo = async() => {
    return dispatch(requestMypageInfo(profileId))
      .then(res => res.payload.data)
  }

  const handleResponse = (res) => {
    if (!isMount.current)
      return

    setInfo({
      img: `${res[1].image}`,
      level: res[1].level,
      nickname: res[1].nickName,
      exp: res[1].exp,
      max: res[1].max,
    })
    setCharacters(
      res[0].map(c => {
        return { ...c, owned: res[1].characters.includes(c.id) }
      })
    )
    setRewards(res[2].result.result)
  }

  const update = () => {
    Promise.all([
      getAllCharacters(), 
      getMypageInfo(),
    ])
      .then(res => {
        handleResponse(res)
      })
      .catch(err => {
        console.dir(err)  // distinguish => no token(push '/'), serverError
      })
  }

  useEffect(() => {
    update()
    setDummyReward(['삼국지 읽어주기', '수호지 읽어주기', '감자탕 먹으러 가기', '점심에 비행기타고 일본에서 우동먹기', '저녁에 중국에서 마파두부 먹기'])
  }, [])

  useEffect(() => {
    // change total size ^^
    setTotal(1 + parseInt((dummyReward.length - 1) / 2))
  }, [dummyReward])

  return (
    <div className={styles.container}>
      <div style={{ textAlign: 'start', position:'absolute' }}>
        <IconButton
          aria-label="home"
          color="inherit"
          size="medium"
          sx={{backgroundColor: '#FFFFFF', border: '5px solid #A3C653', mt: 5, ml: 5}}
          onClick={() => {console.log(props); props.history.push('/home');}}
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
              <img src={info.img} alt="" style={{objectFit: 'contain', width:'10%'}} />
              {info.nickname}
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
              </Typography>
              <Typography sx={{width: '40px', zIndex: 40, fontSize: '30px', color: '#000', gridArea: '1/6/2/7', ml: '-20px'}}>
                asd
              </Typography>
              <StarRoundedIcon sx={{fontSize: '100px', color: '#F5EAB3', zIndex: 30, gridArea: '1/2/2/3', ml: '-50px'}} />
              <StarRoundedIcon sx={{fontSize: '100px', color: '#E8C517', zIndex: 30, gridArea: '1/6/2/7', ml: '-50px'}} />
              <BorderLinearProgress sx={{gridArea: '1/2/2/6', zIndex: 20}} variant="determinate" value={parseInt((info.exp / info.max) * 100) } />
            </div>
          </Paper>
          <Paper elevation={0} sx={{width: '100%', height: '22vh', mt: '10px'}}>
            <ShoppingBasketIcon fontSize={'large'} sx={{position: 'absolute', color: '#A3C653', mt: '7px', ml: '7px', zIndex: '50'}} />
            <Slider total={total}>
              <CharacterSlide sx={12} data={characters} />
              {Array.from({ length: parseInt((dummyReward.length - 1) / 2) + 1 }, (unused, idx) => {
                return (
                  <RewardSlide 
                    key={idx} 
                    data={
                      idx < parseInt((dummyReward.length - 1) / 2) ?
                      dummyReward.slice(idx * 2, idx * 2 + 2) :
                      dummyReward.slice(idx * 2)
                    } />
                )
              })}
            </Slider>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}