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
import { BackLogo } from '../background/BackLogo';
// import Logo from '../Logo'
import bear from '../../images/characters/bear_full.png'
import cat from '../../images/characters/cat_full.png'
import rabbit from '../../images/characters/rabbit_full.png'
import { motion } from 'framer-motion'
import chick from '../../images/characters/chick_full.png'
import Award from './Award';

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
  const [awardOpen, setAwardOpen] = useState(false)
  const [getReward, setGetReward] = useState('')
  
  const [info, setInfo] = useState({
    img: '',
    level: 0,
    nickname: '',
    exp: 0,
    max: 100,
    profileId: undefined,
    characterName: '',
  })
  const [total, setTotal] = useState(1)
  const [rewards, setRewards] = useState([])
  const [characters, setCharacters] = useState([])
  const fullImage = {
    bear: bear,
    cat: cat,
    rabbit: rabbit,
    chick: chick
  }

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
      profileId: res[1].sid,
      characterName: res[1].characterName,
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
    // console.log(info.exp, info.max)
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
        alert('로그인 정보가 올바르지 않습니다')  // distinguish => no token(push '/'), serverError
        props.history.push('/')
      })
  }

  const onClickLevelUp = (e) => {
    if (info.exp < info.max)
      // 경험치 부족하면 do nothing
      return
    

    if (characters.reduce((acc, cv) => acc + cv.owned | 0, 0) < 4) {
      // console.log('requestCharacter')
      // getCharacter
      const nextId = characters.find(character => character.owned === false).id
      const body = {
        sid: info.profileId,
        cid: nextId
      }
      dispatch(requestNextCharacter(body))
        .then(() => update())
        .catch()
    } else {
      // console.log('requestReward')
      // getReward
      // const nextId = rewards.find(reward => reward.status === 'wait').cid

      setAwardOpen(true)
      const body = {
        sid: info.profileId
      }
      dispatch(requestNextReward(body))
        .then(() => update())
        .catch()
    }
  }

  const onClose=()=>{
    setAwardOpen(false)
  }

  useEffect(() => {
    update()
  }, [])

  useEffect(() => {
    // change total size ^^
    if (rewards.length === 0){
      setGetReward('아직 등록된 보상이 없어요')
      setTotal(0);
    }
    else{
      for(let i = 0; i<rewards.length; i++){
        if(rewards[i].status == 'Wait'){        
          console.log(rewards[i])
          setGetReward(rewards[i].title)
          break
        }
      }
      // setGetReward(rewards[0].title)
      setTotal(parseInt((rewards.length - 1) / 2) + 1);
    }
  }, [rewards])

  return (
    <div className={styles.container}>
      <div style={{ textAlign: 'start', position:'absolute' }}>
        <IconButton
          aria-label="home"
          color="inherit"
          size="medium"
          sx={{backgroundColor: '#FFFFFF', border: '5px solid #A3C653', mt: 5, ml: 5, cursor: 'pointer', zIndex: '30'}}
          onClick={() => {props.history.push('/home'); console.log('hi')}}
        >
          <HomeRoundedIcon
            fontSize="inherit"
            sx={{color: '#A3C653'}}
          />
        </IconButton>
      </div>
      <div style={{position: 'absolute', top: '24px', display: 'flex', justifyContent: 'center', width: '100%'}}>
        <BackLogo />
      </div>
      <Grid container item 
        textAlign="start" justifyContent="center" alignItems="center" 
        sx={{height: '100%', paddingTop: '6%'}}
      >  
        <Grid container item
          direction="column" alignItems="end"
          // sx={{width: '30%'}}
          xs={3}
        >
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '100px'}}>
            <img src={fullImage[info.characterName]} alt="" style={{objectFit: 'contain', width:'100%'}} />
            <p>{info.nickname}</p>
          </div>
        </Grid>
        <Grid container item
          xs={5} direction="column" justifyContent="center" alignItems="start"
        >
          <Paper 
            elevation={0} 
            sx={{width: '100%', height: '22vh',  mb: '10px', overflow: 'hidden'}}
            onClick={onClickLevelUp}
            style={info.exp >= info.max ? {cursor: 'pointer'} : {}}
          >
            <StarRoundedIcon fontSize={'large'} sx={{position: 'absolute', color: '#A3C653', mt: '7px', ml: '7px'}} />
            <div style={{width: '100%', height: '100%', filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.3))'}}>
              <div className={styles.progressbar__container}>
                {/* note: negative ml value === width or fontSize / 2 */}
                <Typography sx={{width: '40px', zIndex: 40, fontSize: '30px', color: '#000', gridArea: '1/2/2/3', ml: '-20px'}}>
                </Typography>
                <Typography sx={{width: '40px', zIndex: 40, fontSize: '30px', color: '#000', gridArea: '1/6/2/7', ml: '-20px'}}>
                </Typography>
                <StarRoundedIcon sx={{fontSize: '100px', color: '#F5EAB3', zIndex: 30, gridArea: '1/2/2/3', ml: '-50px'}} />
                {info.exp < info.max &&
                  <StarRoundedIcon sx={{fontSize: '100px', color: '#E8C517', zIndex: 30, gridArea: '1/6/2/7', ml: '-50px', cursor: 'defalut'}} />
                }
                {info.exp >= info.max &&
                <>
                <motion.div 
                  animate={{scale: [1, 1.4]}}
                  transition={{ repeat: Infinity, delay: 1, duration: 0.3, type: 'tween', ease: "circOut", repeatType: 'reverse', repeatDelay: 0.4}} 
                  style={{gridArea: '1/5/2/7', display: 'inline-block', zIndex: 30}}
                >
                  <StarRoundedIcon sx={{fontSize: '100px', color: '#E8C517', zIndex: 30, cursor: 'defalut'}} />
                </motion.div>
                <motion.div 
                  animate={{scale: [1, 2], opacity: [0.1, 0]}}
                  transition={{ repeat: Infinity, delay: 1.98, duration: 0.4, type: 'tween', repeatDelay: 1 }} 
                  style={{gridArea: '1/5/2/7', display: 'inline-block', zIndex: 20}}
                >
                  <StarRoundedIcon sx={{fontSize: '100px', color: '#black', zIndex: 20, cursor: 'defalut'}} />
                </motion.div>
                </>
                }
                <BorderLinearProgress sx={{gridArea: '1/2/2/6', zIndex: 20}} variant="determinate" value={parseInt((info.exp / info.max) * 100) > 100 ? 100 : parseInt((info.exp / info.max) * 100)} />
              </div>
            </div>
          </Paper>
          <Paper elevation={0} sx={{width: '100%', height: '22vh', mt: '10px'}}>
            <ShoppingBasketIcon fontSize={'large'} sx={{position: 'absolute', color: '#A3C653', mt: '7px', ml: '7px', zIndex: '50'}} />
            <Slider total={total}>
              <CharacterSlide sx={12} data={characters} current={info.characterName} update={update} />
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
      <Award open={awardOpen} getEndClose={onClose} title={getReward}/>
    </div>
  )
}