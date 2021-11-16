
import { styled } from '@mui/material/styles';
import { motion } from "framer-motion"
import cloudImage from '../../images/background_cloud.png'

const BackAnimation = styled(motion.div)({
  width: '200px',
  height: '200px',
  display: 'flex',
  zIndex: 0
})

export function Background(){
  return(
    <div>
      <BackAnimation 
        animate={{ 
          scale: 2, 
          x:100, 
          y:100,
          position: 'fixed',
          top:'-100px',
          left:'-100px',
          zIndex: 0
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={cloudImage} style={{width:'250px'}}/>
      </BackAnimation>
      <BackAnimation 
        animate={{ 
          scale: 2, 
          x:-200, 
          y:100,
          position: 'fixed',
          top:'-100px',
          left:'100%'
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={cloudImage} style={{width:'250px'}}/>
      </BackAnimation>
      <BackAnimation 
        animate={{ 
          scale: 2, 
          x:100, 
          y:-200,
          position: 'fixed',
          top:'100%',
          left:'-100px'
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={cloudImage} style={{width:'250px'}}/>
      </BackAnimation>
      <BackAnimation 
        animate={{ 
          scale: 2, 
          x:-250, 
          y:-200,
          position: 'fixed',
          top:'100%',
          left:'100%'
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={cloudImage} style={{width:'250px'}}/>
      </BackAnimation>
    </div>
  )
}