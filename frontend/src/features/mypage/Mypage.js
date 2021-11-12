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
import useIsMount from '../../utils/useIsMount';
import { 
  requestAllCharacters, 
  requestMypageInfo, 
  requestNextReward, 
  requestNextCharacter,
} from '../../app/actions/userActions';

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
  const dispatch = useDispatch()
  const isMount = useIsMount()
  
  const [info, setInfo] = useState({
    img: '',
    level: 0,
    nickname: '',
    exp: 0,
    max: 100,
    profileId: undefined,
  })
  const [total, setTotal] = useState(1)
  const [rewards, setRewards] = useState([])
  const [characters, setCharacters] = useState([])
  

  const getAllCharacters = async() => {
    return dispatch(requestAllCharacters())
      .then(res => res.payload.data)
  }
  const getMypageInfo = async() => {
    return dispatch(requestMypageInfo(localStorage.getItem('sub-user')))
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
      profileId: res[1].sid
    })
    const tmp = res[0].map(c => {
        return { ...c, owned: res[1].characters.includes(c.id) }
      })
    tmp.sort(function(a, b) {
      if (a.owned === b.owned) 
        return a.id - b.id
      else
        return b.owned - a.owned
    })
    setCharacters(tmp)
    setRewards(res[1].goals)
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

  const onClickLevelUp = () => {
    if (info.exp !== info.max)
      // 경험치 부족하면 do nothing
      return
    else {
      if (characters.reduce((acc, cv) => acc + cv.owned | 0, 0) < 4) {
        // getCharacter
        const nextId = characters.find(character => character.owned === false).id
        const body = {
          sid: info.profileId,
          cid: nextId
        }
        dispatch(requestNextCharacter(body))
          .then()
          .catch()
      } else {
        // getReward
        const nextId = rewards.find(reward => reward.status === 'wait').cid
        dispatch(requestNextReward(info.profileId))
          .then()
          .catch()
      }
    }
  }

  useEffect(() => {
    update()
  }, [])

  useEffect(() => {
    // change total size ^^
    setTotal(1 + parseInt((rewards.length - 1) / 2))
  }, [rewards])

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
        <Grid container item
          direction="column" alignItems="end"
          // sx={{width: '30%'}}
          xs={3}
        >
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '100px'}}>
            <img src={info.img} alt="" style={{objectFit: 'contain', width:'100%'}} />
            <p>{info.nickname}</p>
          </div>
        </Grid>
        <Grid container item
          xs={5} direction="column" justifyContent="center" alignItems="start"
        >
          <Paper 
            elevation={0} 
            sx={{width: '100%', height: '22vh',  mb: '10px'}}
            onClick={onClickLevelUp}
          >
            <StarRoundedIcon fontSize={'large'} sx={{position: 'absolute', color: '#A3C653', mt: '7px', ml: '7px'}} />
            <div className={styles.progressbar__container}>
              {/* note: negative ml value === width or fontSize / 2 */}
              <Typography sx={{width: '40px', zIndex: 40, fontSize: '30px', color: '#000', gridArea: '1/2/2/3', ml: '-20px'}}>
              </Typography>
              <Typography sx={{width: '40px', zIndex: 40, fontSize: '30px', color: '#000', gridArea: '1/6/2/7', ml: '-20px'}}>
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
              {Array.from({ length: parseInt((rewards.length - 1) / 2) + 1 }, (unused, idx) => {
                return (
                  <RewardSlide 
                    key={idx} 
                    data={
                      idx < parseInt((rewards.length - 1) / 2) ?
                      rewards.slice(idx * 2, idx * 2 + 2) :
                      rewards.slice(idx * 2)
                    } 
                  />
                )
              })}
            </Slider>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}